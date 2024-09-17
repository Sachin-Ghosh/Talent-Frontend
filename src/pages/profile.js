import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/router';
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Briefcase, GraduationCap, Mail, Link, FileText } from "lucide-react";
import Image from 'next/image';
import { format } from 'date-fns';
import { toast } from 'sonner';

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const { token, authUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    fetchCandidateId();
  }, [authUser]);

  const fetchCandidateId = async () => {
    if (!authUser) return;
    try {
      const response = await fetch(`${process.env.API_URL}api/candidates/user/${authUser._id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) throw new Error('Failed to fetch candidate ID');
      const data = await response.json();
      fetchProfile(data.candidateId);
    } catch (error) {
      console.error('Error fetching candidate ID:', error);
      toast.error('Failed to load profile data');
      setLoading(false);
    }
  };

  const fetchProfile = async (candidateId) => {
    try {
      const response = await fetch(`${process.env.API_URL}api/candidates/${candidateId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) throw new Error('Failed to fetch profile');
      const data = await response.json();
      setProfile(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast.error('Failed to load profile data');
      setLoading(false);
    }
  };

  const handleInputChange = (e, field) => {
    setProfile({ ...profile, [field]: e.target.value });
  };

  const handleEducationChange = (e, field) => {
    setProfile({
      ...profile,
      education: { ...profile.education, [field]: e.target.value }
    });
  };

  const handleExperienceChange = (index, field, value) => {
    const updatedExperience = [...profile.experience];
    updatedExperience[index] = { ...updatedExperience[index], [field]: value };
    setProfile({ ...profile, experience: updatedExperience });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.API_URL}api/candidates/${profile._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(profile)
      });
      if (!response.ok) throw new Error('Failed to update profile');
      toast.success('Profile updated successfully');
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!profile) return <div>Error loading profile.</div>;

  return (
    <div className="container mx-auto p-4 space-y-6">
      <Card>
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <Avatar className="w-32 h-32">
              <Image src="/assets/Nav-logo.png" alt="Profile picture" height={1000} width={1000}/>
            </Avatar>
            <div className="space-y-2">
              <h1 className="text-3xl font-bold">{profile.userId.name}</h1>
              <p className="text-xl text-muted-foreground">{profile.userId.email}</p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Mail className="w-3 h-3" />
                  {profile.userId.email}
                </Badge>
                {profile.resumeLink && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Link className="w-3 h-3" />
                    <a href={profile.resumeLink} target="_blank" rel="noopener noreferrer">Resume</a>
                  </Badge>
                )}
              </div>
            </div>
            <div className="flex-grow" />
            <Button onClick={() => setIsEditing(!isEditing)}>
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </Button>
          </div>
        </div>
      </Card>

      <form onSubmit={handleSubmit}>
        <Card>
          <div>
            <h2 className="text-2xl font-bold p-6">Profile Summary</h2>
          </div>
          <div className="p-6">
            {isEditing ? (
              <Textarea
                value={profile.bio || ''}
                onChange={(e) => handleInputChange(e, 'bio')}
                placeholder="Tell us about yourself"
              />
            ) : (
              <p>{profile.bio || "No summary available"}</p>
            )}
          </div>
        </Card>

        <Card>
          <div>
            <h2 className="text-2xl font-bold p-6">Education</h2>
          </div>
          <div className="p-6 space-y-6">
            {isEditing ? (
              <div className="space-y-4">
                <Input
                  placeholder="Degree"
                  value={profile.education.degree || ''}
                  onChange={(e) => handleEducationChange(e, 'degree')}
                />
                <Input
                  placeholder="Institution"
                  value={profile.education.institution || ''}
                  onChange={(e) => handleEducationChange(e, 'institution')}
                />
                <Input
                  placeholder="Course"
                  value={profile.education.course || ''}
                  onChange={(e) => handleEducationChange(e, 'course')}
                />
                <Input
                  type="number"
                  placeholder="Year of Completion"
                  value={profile.education.yearOfCompletion || ''}
                  onChange={(e) => handleEducationChange(e, 'yearOfCompletion')}
                />
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-muted-foreground" />
                  <h3 className="font-semibold">{profile.education.degree}</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  {profile.education.institution} | {profile.education.course} | {profile.education.yearOfCompletion}
                </p>
              </div>
            )}
          </div>
        </Card>

        <Card>
          <div>
            <h2 className="text-2xl font-bold p-6">Work Experience</h2>
          </div>
          <div className="p-6 space-y-6">
            {profile.experience.map((job, index) => (
              <div key={index} className="space-y-2">
                {isEditing ? (
                  <div className="space-y-4">
                    <Input
                      placeholder="Company Name"
                      value={job.companyName}
                      onChange={(e) => handleExperienceChange(index, 'companyName', e.target.value)}
                    />
                    <Input
                      placeholder="Role"
                      value={job.role}
                      onChange={(e) => handleExperienceChange(index, 'role', e.target.value)}
                    />
                    <Input
                      type="date"
                      value={format(new Date(job.startDate), 'yyyy-MM-dd')}
                      onChange={(e) => handleExperienceChange(index, 'startDate', e.target.value)}
                    />
                    <Input
                      type="date"
                      value={format(new Date(job.endDate), 'yyyy-MM-dd')}
                      onChange={(e) => handleExperienceChange(index, 'endDate', e.target.value)}
                    />
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-muted-foreground" />
                      <h3 className="font-semibold">{job.role}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {job.companyName} | {job.yearsWorked} years
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {format(new Date(job.startDate), 'MMM yyyy')} - {format(new Date(job.endDate), 'MMM yyyy')}
                    </p>
                  </>
                )}
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <div>
            <h2 className="text-2xl font-bold p-6">Skills</h2>
          </div>
          <div className="p-6">
            {isEditing ? (
              <Input
                value={profile.skills.join(', ')}
                onChange={(e) => setProfile({ ...profile, skills: e.target.value.split(',').map(skill => skill.trim()) })}
                placeholder="Enter skills separated by commas"
              />
            ) : (
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary">{skill}</Badge>
                ))}
              </div>
            )}
          </div>
        </Card>

        {isEditing && (
          <Button type="submit" className="mt-4">Save Changes</Button>
        )}
      </form>
    </div>
  );
}
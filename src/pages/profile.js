

import React, { useEffect, useState } from 'react';
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, GraduationCap, Mail, MapPin, Phone } from "lucide-react";
import Image from 'next/image';

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Function to fetch the user's profile data
  const fetchProfile = async () => {
    try {
      const response = await fetch('https://talent-backend-wfqd.onrender.com/api/candidates/66e52262d590b649056253cd', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Ensure token is valid
        }
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch profile');
      }
  
      const data = await response.json();
      setProfile(data);  // Assuming you have a setProfile function
      setLoading(false);  // Assuming you are handling loading state
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!profile) {
    return <div>Error loading profile.</div>;
  }

  // Update the structure of the JSX to match the response data
  return (
    <div className="container mx-auto p-4 space-y-6">
      <Card>
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <Avatar className="w-32 h-32">
              <Image src="/assets/Nav-logo.png" alt="Profile picture" height={1000} width={1000}/>
            </Avatar>
            <div className="space-y-2">
              <h1 className="text-3xl font-bold">{profile.userId.name}</h1> {/* Access name under userId */}
              <p className="text-xl text-muted-foreground">{profile.role || "Candidate"}</p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Mail className="w-3 h-3" />
                  {profile.userId.email} {/* Access email under userId */}
                </Badge>
              </div>
            </div>
            <div className="flex-grow" />
            <Button>Edit Profile</Button>
          </div>
        </div>
      </Card>

      <Card>
        <div>
          <h2 className="text-2xl font-bold p-6">Profile Summary</h2>
        </div>
        <div className="p-6">
          <p>{profile.summary || "No summary available"}</p> {/* Add a fallback for summary */}
        </div>
      </Card>

      <Card>
        <div>
          <h2 className="text-2xl font-bold p-6">Work Experience</h2>
        </div>
        <div className="p-6 space-y-6">
          {profile.experience.map((job, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-muted-foreground" />
                <h3 className="font-semibold">{job.role}</h3>
              </div>
              <p className="text-sm text-muted-foreground">{job.companyName} | {job.yearsWorked} years</p>
              <p>{job.description || "No description provided"}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <div>
          <h2 className="text-2xl font-bold p-6">Education</h2>
        </div>
        <div className="p-6 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-muted-foreground" />
              <h3 className="font-semibold">{profile.education.degree}</h3>
            </div>
            <p className="text-sm text-muted-foreground">{profile.education.institution} | {profile.education.yearOfCompletion}</p>
          </div>
        </div>
      </Card>

      <Card>
        <div>
          <h2 className="text-2xl font-bold p-6">Skills</h2>
        </div>
        <div className="p-6">
          <div className="flex flex-wrap gap-2">
            {profile.skills.map((skill, index) => (
              <Badge key={index} variant="secondary">{skill}</Badge>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}

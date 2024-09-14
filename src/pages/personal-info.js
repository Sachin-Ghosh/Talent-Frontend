import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { toast } from "sonner"
import { MdDelete } from "react-icons/md";
import { useRouter } from "next/router"

export default function UserProfilePage() {
  const router = useRouter();
  const [skills, setSkills] = useState([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isEducationDialogOpen, setIsEducationDialogOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bio: "",
    resumeLink: "", // Added resume link to formData
    education: [],
    experience: [],
    skills: []
  });
  const [educationData, setEducationData] = useState({
    institution: "",
    course: "",
    graduationDate: new Date(),
  });
  const [experienceData, setExperienceData] = useState({
    companyName: "",
    position: "",
    startDate: new Date(),
    endDate: new Date(),
  });

  async function onSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.API_URL}api/candidates/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      console.log(formData)
      if (!response.ok) {
        const errorMessage = await response.text(); // Get error message from response
        throw new Error(`Network response was not ok: ${errorMessage}`);
      }
      toast("Successfully added info.");
    } catch (error) {
      toast(`Error has occurred: ${error.message}`); // Display detailed error message
      console.error('Error:', error);
    }
  }

  const addEducation = (data) => {
    setFormData(prev => ({
      ...prev,
      education: [...prev.education, data]
    }));
    setIsDialogOpen(false);
    setEducationData({
      institution: "",
      course: "",
      graduationDate: new Date(),
    });
  }

  const addExperience = (data) => {
    setFormData(prev => ({
      ...prev,
      experience: [...prev.experience, data]
    }));
    setIsDialogOpen(false);
    setExperienceData({
      companyName: "",
      position: "",
      startDate: new Date(),
      endDate: new Date(),
    });
  }

  const addSkill = (skill) => {
    if (skill && !skills.includes(skill)) {
      const newSkills = [...skills, skill];
      setSkills(newSkills);
      setFormData(prev => ({
        ...prev,
        skills: newSkills
      }));
    }
  }

  const handleSaveProfile = () => {
    if (!formData.name || !formData.email) {
      toast("Please fill in all required fields: Name and Email.");
      return;
    }
    // Optionally, you can add more validation here
    router.push('/dashboard');
  }

  return (
    <div className=" p-4 w-full container mx-auto space-y-6">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>User Profile</CardTitle>
          <CardDescription>Enter your personal and professional details</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-8">
            <div>
              <label>Name</label>
              <Input placeholder="John Doe" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
            </div>
            <div>
              <label>Email</label>
              <Input placeholder="johndoe@example.com" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
            </div>
            <div>
              <label>Resume Link</label> {/* New input for resume link */}
              <Input placeholder="https://example.com/resume.pdf" value={formData.resumeLink} onChange={(e) => setFormData({ ...formData, resumeLink: e.target.value })} />
            </div>
            <div>
              <label>Bio</label>
              <Textarea placeholder="Tell us about yourself" value={formData.bio} onChange={(e) => setFormData({ ...formData, bio: e.target.value })} />
              <p>You can write up to 500 characters.</p>
            </div>
            <div className=" flex flex-col gap-2">
              <label>Education</label>
              {formData.education.map((edu, index) => (
                <div key={index} className="flex justify-between items-center bg-secondary p-4 rounded-md mt-2">
                  <div className="">
                    <p><strong>Institution:</strong> {edu.institution}</p>
                    <p><strong>Course:</strong> {edu.course}</p>
                    <p><strong>Graduation Date:</strong> {format(new Date(edu.graduationDate), 'PP')}</p>
                  </div>
                  <Button 
                    className="bg-transparent hover:bg-transparent shadow-none" 
                    onClick={() => {
                      const updatedEducation = formData.education.filter((_, i) => i !== index);
                      setFormData(prev => ({ ...prev, education: updatedEducation }));
                    }}
                  >
                    <MdDelete color="red" size={30}/>
                  </Button>
                </div>
              ))}
              <Dialog open={isEducationDialogOpen} onOpenChange={setIsEducationDialogOpen}>
                <DialogTrigger asChild>
                  <Button type="button" variant="outline" className="mt-2">
                    Add Education
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Education</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={(e) => { e.preventDefault(); addEducation(educationData); }} className="space-y-4">
                    <div>
                      <label>Institution</label>
                      <Input placeholder="University name" value={educationData.institution} onChange={(e) => setEducationData({ ...educationData, institution: e.target.value })} />
                    </div>
                    <div>
                      <label>Course</label>
                      <Input placeholder="Course details" value={educationData.course} onChange={(e) => setEducationData({ ...educationData, course: e.target.value })} />
                    </div>
                    <div className="flex flex-col">
                      <label>Graduation Date</label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn("w-[240px] pl-3 text-left font-normal", !educationData.graduationDate && "text-muted-foreground")}
                          >
                            {educationData.graduationDate ? (
                              format(educationData.graduationDate, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={educationData.graduationDate}
                            onSelect={(date) => setEducationData({ ...educationData, graduationDate: date })}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <Button type="submit">Add Education</Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            {/* //Experience */}
            <div className=" flex flex-col gap-2">
              <label>Experience</label>
              {formData.experience.map((exp, index) => (
                <div className="flex justify-between items-center bg-secondary p-4 rounded-md mt-2">
                <div key={index} className="bg-secondary p-4 rounded-md mt-2">
                  <p><strong>Company Name:</strong> {exp.companyName}</p>
                  <p><strong>Position:</strong> {exp.position}</p>
                  <p><strong>Start Date:</strong> {format(new Date(exp.startDate), 'PP')}</p>
                  <p><strong>End Date:</strong> {format(new Date(exp.endDate), 'PP')}</p>
                </div>
                <Button 
                    className="bg-transparent hover:bg-transparent shadow-none" 
                    onClick={() => {
                      const updatedExperience = formData.experience.filter((_, i) => i !== index);
                      setFormData(prev => ({ ...prev, experience: updatedExperience }));
                    }}
                  >
                    <MdDelete color="red" size={30}/>
                  </Button>
                </div>
              ))}
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button type="button" variant="outline" className="mt-2">
                    Add Experience
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Experience</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={(e) => { e.preventDefault(); addExperience(experienceData); }} className="space-y-4">
                    <div>
                      <label>Company Name</label>
                      <Input placeholder="Company name" value={experienceData.companyName} onChange={(e) => setExperienceData({ ...experienceData, companyName: e.target.value })} />
                    </div>
                    <div>
                      <label>Position</label>
                      <Input placeholder="Position details" value={experienceData.position} onChange={(e) => setExperienceData({ ...experienceData, position: e.target.value })} />
                    </div>
                    <div className="flex flex-col">
                      <label>Start Date</label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn("w-[240px] pl-3 text-left font-normal", !experienceData.startDate && "text-muted-foreground")}
                          >
                            {experienceData.startDate ? (
                              format(experienceData.startDate, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={experienceData.startDate}
                            onSelect={(date) => setExperienceData({ ...experienceData, startDate: date })}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="flex flex-col">
                      <label>End Date</label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn("w-[240px] pl-3 text-left font-normal", !experienceData.endDate && "text-muted-foreground")}
                          >
                            {experienceData.endDate ? (
                              format(experienceData.endDate, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={experienceData.endDate}
                            onSelect={(date) => setExperienceData({ ...experienceData, endDate: date })}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <Button type="submit">Add Experience</Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
            <div>
              <label>Skills</label>
              <div className="flex space-x-2">
                <Input
                  placeholder="Add a skill"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addSkill(e.target.value);
                      e.target.value = '';
                    }
                  }}
                />
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => {
                    const input = document.querySelector('input[placeholder="Add a skill"]');
                    if (input) {
                      addSkill(input.value);
                      input.value = '';
                    }
                  }}
                >
                  Add Skill
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {skills.map((skill, index) => (
                  <div key={index} className="bg-gray-200 text-black px-2 py-1 rounded-full">
                    {skill}
                  </div>
                ))}
              </div>
            </div>
            <Button type="button" onClick={handleSaveProfile}>Save Profile</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

// import React, { useEffect, useState } from 'react';
// import { Avatar } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Briefcase, GraduationCap, Mail, MapPin, Phone } from "lucide-react";
// import Image from 'next/image';

// export default function ProfilePage() {
//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const response = await fetch('https://talent-backend-wfqd.onrender.com/api/candidates/profile');
//         if (!response.ok) {
//           throw new Error('Failed to fetch profile');
//         }
//         const data = await response.json();
//         setProfile(data);
//       } catch (error) {
//         console.error("Error fetching the profile data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (!profile) {
//     return <div>Error loading profile</div>;
//   }

//   return (
//     <div className="container mx-auto p-4 space-y-6">
//       <Card>
//         <div className="p-6">
//           <div className="flex flex-col md:flex-row gap-6">
//             <Avatar className="w-32 h-32">
//               <Image src="/assets/Nav-logo.png" alt="Profile picture" height={1000} width={1000} />
//             </Avatar>
//             <div className="space-y-2">
//               <h1 className="text-3xl font-bold">{profile.userId.name}</h1>
//               <p className="text-xl text-muted-foreground">{profile.userId.role}</p>
//               <div className="flex flex-wrap gap-2">
//                 <Badge variant="secondary" className="flex items-center gap-1">
//                   <MapPin className="w-3 h-3" />
//                   {profile.location || "Unknown Location"}
//                 </Badge>
//                 <Badge variant="secondary" className="flex items-center gap-1">
//                   <Mail className="w-3 h-3" />
//                   {profile.userId.email}
//                 </Badge>
//                 <Badge variant="secondary" className="flex items-center gap-1">
//                   <Phone className="w-3 h-3" />
//                   {profile.userId.phone || "(123) 456-7890"}
//                 </Badge>
//               </div>
//             </div>
//             <div className="flex-grow" />
//             <Button>Edit Profile</Button>
//           </div>
//         </div>
//       </Card>

//       <Card>
//         <div>
//           <h2 className="text-2xl font-bold p-6">Profile Summary</h2>
//         </div>
//         <div className="p-6">
//           <p>{profile.summary || "No summary available"}</p>
//         </div>
//       </Card>

//       <Card>
//         <div>
//           <h2 className="text-2xl font-bold p-6">Work Experience</h2>
//         </div>
//         <div className="p-6 space-y-6">
//           {profile.experience.length > 0 ? (
//             profile.experience.map((exp, index) => (
//               <div key={index} className="space-y-2">
//                 <div className="flex items-center gap-2">
//                   <Briefcase className="w-4 h-4 text-muted-foreground" />
//                   <h3 className="font-semibold">{exp.role}</h3>
//                 </div>
//                 <p className="text-sm text-muted-foreground">{exp.companyName} | {exp.yearsWorked} years</p>
//               </div>
//             ))
//           ) : (
//             <p>No work experience available</p>
//           )}
//         </div>
//       </Card>

//       <Card>
//         <div>
//           <h2 className="text-2xl font-bold p-6">Education</h2>
//         </div>
//         <div className="p-6 space-y-6">
//           {profile.education ? (
//             <div className="space-y-2">
//               <div className="flex items-center gap-2">
//                 <GraduationCap className="w-4 h-4 text-muted-foreground" />
//                 <h3 className="font-semibold">{profile.education.degree}</h3>
//               </div>
//               <p className="text-sm text-muted-foreground">{profile.education.institution} | {profile.education.yearOfCompletion}</p>
//             </div>
//           ) : (
//             <p>No education information available</p>
//           )}
//         </div>
//       </Card>

//       <Card>
//         <div>
//           <h2 className="text-2xl font-bold p-6">Skills</h2>
//         </div>
//         <div className="p-6">
//           <div className="flex flex-wrap gap-2">
//             {profile.skills.length > 0 ? (
//               profile.skills.map((skill, index) => (
//                 <Badge key={index} variant="secondary">{skill}</Badge>
//               ))
//             ) : (
//               <p>No skills available</p>
//             )}
//           </div>
//         </div>
//       </Card>
//     </div>
//   );
// }

import React from 'react';
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, GraduationCap, Mail, MapPin, Phone } from "lucide-react";
import Image from 'next/image';

export default function ProfilePage() {
  return (
    <div className="container mx-auto p-4 space-y-6">
      <Card>
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <Avatar className="w-32 h-32">
              <Image src="/assets/Nav-logo.png" alt="Profile picture" height={1000} width={1000}/>
            </Avatar>
            <div className="space-y-2">
              <h1 className="text-3xl font-bold">John Doe</h1>
              <p className="text-xl text-muted-foreground">Senior Software Engineer</p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  San Francisco, CA
                </Badge>
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Mail className="w-3 h-3" />
                  john.doe@example.com
                </Badge>
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Phone className="w-3 h-3" />
                  (123) 456-7890
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
          <p>
            Experienced software engineer with a passion for creating efficient, scalable, and innovative solutions.
            Skilled in full-stack development with a focus on cloud technologies and microservices architecture.
            Strong problem-solving abilities and a track record of delivering high-quality projects on time.
          </p>
        </div>
      </Card>

      <Card>
        <div>
          <h2 className="text-2xl font-bold p-6">Work Experience</h2>
        </div>
        <div className="p-6 space-y-6">
          {[
            {
              title: "Senior Software Engineer",
              company: "Tech Innovators Inc.",
              period: "Jan 2020 - Present",
              description: "Lead development of cloud-based solutions, mentored junior developers, and implemented CI/CD pipelines."
            },
            {
              title: "Software Engineer",
              company: "Digital Solutions Ltd.",
              period: "Jun 2017 - Dec 2019",
              description: "Developed and maintained web applications, collaborated with cross-functional teams, and optimized database queries."
            }
          ].map((job, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-muted-foreground" />
                <h3 className="font-semibold">{job.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground">{job.company} | {job.period}</p>
              <p>{job.description}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <div>
          <h2 className="text-2xl font-bold p-6">Education</h2>
        </div>
        <div className="p-6 space-y-6">
          {[
            {
              degree: "Master of Science in Computer Science",
              school: "Tech University",
              year: "2017"
            },
            {
              degree: "Bachelor of Science in Software Engineering",
              school: "State University",
              year: "2015"
            }
          ].map((edu, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-muted-foreground" />
                <h3 className="font-semibold">{edu.degree}</h3>
              </div>
              <p className="text-sm text-muted-foreground">{edu.school} | {edu.year}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <div>
          <h2 className="text-2xl font-bold p-6">Skills</h2>
        </div>
        <div className="p-6">
          <div className="flex flex-wrap gap-2">
            {["JavaScript", "React", "Node.js", "Python", "AWS", "Docker", "GraphQL", "TypeScript", "MongoDB", "Git"].map((skill) => (
              <Badge key={skill} variant="secondary">{skill}</Badge>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
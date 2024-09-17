import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { useAuth } from "@/context/AuthContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon } from "lucide-react"
import { format, differenceInYears } from "date-fns"
import { cn } from "@/lib/utils"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { toast } from "sonner"
import { MdDelete } from "react-icons/md"

export default function UserProfilePage() {
  const router = useRouter()
  const { token, authUser } = useAuth()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isEducationDialogOpen, setIsEducationDialogOpen] = useState(false)
  const [formData, setFormData] = useState({
    education: {},
    experience: [],
    resumeLink: "",
    bio: "",
    skills: []
  })
  const [educationData, setEducationData] = useState({
    degree: "",
    institution: "",
    course: "",
    yearOfCompletion: "",
    graduationDate: new Date(),
  })
  const [experienceData, setExperienceData] = useState({
    companyName: "",
    role: "",
    startDate: new Date(),
    endDate: new Date(),
  })

  useEffect(() => {
    if (authUser) {
      setFormData(prevData => ({
        ...prevData,
        name: authUser.name,
        email: authUser.email
      }))
    }
  }, [authUser])

  async function onSubmit(e) {
    e.preventDefault()
    try {
      const response = await fetch(`${process.env.API_URL}api/candidates/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          userId: authUser._id,
          ...formData
        }),
      })
      if (!response.ok) {
        const errorMessage = await response.text()
        throw new Error(`Network response was not ok: ${errorMessage}`)
      }
      toast("Successfully updated profile.")
      router.push('/dashboard')
    } catch (error) {
      toast(`Error has occurred: ${error.message}`)
      console.error('Error:', error)
    }
  }

  const addEducation = (data) => {
    setFormData(prev => ({
      ...prev,
      education: data
    }))
    setIsEducationDialogOpen(false)
    setEducationData({
      degree: "",
      institution: "",
      course: "",
      yearOfCompletion: "",
      graduationDate: new Date(),
    })
  }

  const addExperience = (data) => {
    const yearsWorked = differenceInYears(new Date(data.endDate), new Date(data.startDate))
    setFormData(prev => ({
      ...prev,
      experience: [...prev.experience, { ...data, yearsWorked }]
    }))
    setIsDialogOpen(false)
    setExperienceData({
      companyName: "",
      role: "",
      startDate: new Date(),
      endDate: new Date(),
    })
  }

  const addSkill = (skill) => {
    if (skill && !formData.skills.includes(skill)) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, skill]
      }))
    }
  }

  return (
    <div className="p-4 w-full container mx-auto space-y-6">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>User Profile</CardTitle>
          <CardDescription>Enter your personal and professional details</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-8">
            <div>
              <label>Name</label>
              <Input placeholder="John Doe" value={formData.name} readOnly />
            </div>
            <div>
              <label>Email</label>
              <Input placeholder="johndoe@example.com" type="email" value={formData.email} readOnly />
            </div>
            <div>
              <label>Resume Link</label>
              <Input placeholder="https://example.com/resume.pdf" value={formData.resumeLink} onChange={(e) => setFormData({ ...formData, resumeLink: e.target.value })} />
            </div>
            <div>
              <label>Bio</label>
              <Textarea placeholder="Tell us about yourself" value={formData.bio} onChange={(e) => setFormData({ ...formData, bio: e.target.value })} />
              <p>You can write up to 500 characters.</p>
            </div>
            
            {/* Education Section */}
            <div className="flex flex-col gap-2">
              <label>Education</label>
              {formData.education.institution && (
                <div className="flex justify-between items-center bg-secondary p-4 rounded-md mt-2">
                  <div>
                    <p><strong>Degree:</strong> {formData.education.degree}</p>
                    <p><strong>Institution:</strong> {formData.education.institution}</p>
                    <p><strong>Course:</strong> {formData.education.course}</p>
                    <p><strong>Year of Completion:</strong> {formData.education.yearOfCompletion}</p>
                    <p><strong>Graduation Date:</strong> {format(new Date(formData.education.graduationDate), 'PP')}</p>
                  </div>
                  <Button 
                    className="bg-transparent hover:bg-transparent shadow-none" 
                    onClick={() => setFormData(prev => ({ ...prev, education: {} }))}
                  >
                    <MdDelete color="red" size={30}/>
                  </Button>
                </div>
              )}
              <Dialog open={isEducationDialogOpen} onOpenChange={setIsEducationDialogOpen}>
                <DialogTrigger asChild>
                  <Button type="button" variant="outline" className="mt-2">
                    {formData.education.institution ? "Edit Education" : "Add Education"}
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Education</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={(e) => { e.preventDefault(); addEducation(educationData); }} className="space-y-4">
                    <div>
                      <label>Degree</label>
                      <Input placeholder="Bachelor's, Master's, etc." value={educationData.degree} onChange={(e) => setEducationData({ ...educationData, degree: e.target.value })} />
                    </div>
                    <div>
                      <label>Institution</label>
                      <Input placeholder="University name" value={educationData.institution} onChange={(e) => setEducationData({ ...educationData, institution: e.target.value })} />
                    </div>
                    <div>
                      <label>Course</label>
                      <Input placeholder="Course details" value={educationData.course} onChange={(e) => setEducationData({ ...educationData, course: e.target.value })} />
                    </div>
                    <div>
                      <label>Year of Completion</label>
                      <Input type="number" placeholder="Year" value={educationData.yearOfCompletion} onChange={(e) => setEducationData({ ...educationData, yearOfCompletion: e.target.value })} />
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

            {/* Experience Section */}
            <div className="flex flex-col gap-2">
              <label>Experience</label>
              {formData.experience.map((exp, index) => (
                <div key={index} className="flex justify-between items-center bg-secondary p-4 rounded-md mt-2">
                  <div>
                    <p><strong>Company Name:</strong> {exp.companyName}</p>
                    <p><strong>Role:</strong> {exp.role}</p>
                    <p><strong>Start Date:</strong> {format(new Date(exp.startDate), 'PP')}</p>
                    <p><strong>End Date:</strong> {format(new Date(exp.endDate), 'PP')}</p>
                    <p><strong>Years Worked:</strong> {exp.yearsWorked}</p>
                  </div>
                  <Button 
                    className="bg-transparent hover:bg-transparent shadow-none" 
                    onClick={() => {
                      const updatedExperience = formData.experience.filter((_, i) => i !== index)
                      setFormData(prev => ({ ...prev, experience: updatedExperience }))
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
                      <label>Role</label>
                      <Input placeholder="Your position" value={experienceData.role} onChange={(e) => setExperienceData({ ...experienceData, role: e.target.value })} />
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

            {/* Skills Section */}
            <div>
              <label>Skills</label>
              <div className="flex space-x-2">
                <Input
                  placeholder="Add a skill"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      addSkill(e.target.value)
                      e.target.value = ''
                    }
                  }}
                />
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => {
                    const input = document.querySelector('input[placeholder="Add a skill"]')
                    if (input) {
                      addSkill(input.value)
                      input.value = ''
                    }
                  }}
                >
                  Add Skill
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.skills.map((skill, index) => (
                  <div key={index} className="bg-gray-200 text-black px-2 py-1 rounded-full">
                    {skill}
                  </div>
                ))}
              </div>
            </div>
            <Button type="submit">Save Profile</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

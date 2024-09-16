import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, FileText } from "lucide-react"
import TestPage from '@/components/Test-questions'

export default function Component() {
  const [testStarted, setTestStarted] = useState(false)

  const handleStartTest = () => {
    setTestStarted(true)
    // Additional logic for starting the test can be added here
  }

  if (testStarted) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <Card className="w-full">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-4">Test in Progress</h2>
            <TestPage/>
          </CardContent>

        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full min-h-screen">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Welcome to the Test</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className=" flex flex-col justify-center space-y-2">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Test Instructions
            </h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Read each question carefully before answering.</li>
              <li>You can navigate between questions using the next and previous buttons.</li>
              <li>You can mark questions for review and come back to them later.</li>
              <li>Once you submit the test, you cannot change your answers.</li>
              <li>Ensure you have a stable internet connection throughout the test.</li>
            </ul>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            <span className="font-semibold">Test Duration:</span> 60 minutes
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button size="lg" onClick={handleStartTest} className="w-full sm:w-auto">
            Start Test
          </Button>
        </CardFooter>
      </Card>
      
    </div>
  )
}
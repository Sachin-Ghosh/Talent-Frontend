import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChevronLeft, ChevronRight, CheckCircle, XCircle, Clock } from 'lucide-react'
import Camera from './camera'

const questions = [
  {
    id: 1,
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctAnswer: "Paris"
  },
  {
    id: 2,
    question: "Which planet is known as the Red Planet?",
    options: ["Mars", "Venus", "Jupiter", "Saturn"],
    correctAnswer: "Mars"
  },
  {
    id: 3,
    question: "Who painted the Mona Lisa?",
    options: ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Claude Monet"],
    correctAnswer: "Leonardo da Vinci"
  }
]

export default function TestPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState(0)
  const [timer, setTimer] = useState(0)

  const currentQuestion = questions[currentQuestionIndex]

  useEffect(() => {
    let interval
    if (!submitted) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [submitted])

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  const handleAnswerChange = (value) => {
    setAnswers({
      ...answers,
      [currentQuestion.id]: value
    })
  }

  const handleSubmit = () => {
    let newScore = 0
    questions.forEach(question => {
      if (answers[question.id] === question.correctAnswer) {
        newScore++
      }
    })
    setScore(newScore)
    setSubmitted(true)
  }

  const isAnswerCorrect = (questionId) => {
    return answers[questionId] === questions.find(q => q.id === questionId).correctAnswer
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-4">Question Overview</h2>
          <ScrollArea className="h-[calc(100vh-8rem)]">
            {questions.map((question, index) => (
              <Button
                key={question.id}
                variant="ghost"
                className={`w-full justify-start mb-2 ${
                  index === currentQuestionIndex ? 'bg-gray-100' : ''
                } ${
                  answers[question.id] 
                    ? 'bg-green-600 hover:text-white hover:bg-green-500' 
                    : 'bg-gray-500 hover:text-white hover:bg-gray-500'
                }`}
                onClick={() => setCurrentQuestionIndex(index)}
              >
                Question {index + 1}
              </Button>
            ))}
          </ScrollArea>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 p-4">
        <div className="w-full mx-auto space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-2xl font-bold">
                Question {currentQuestionIndex + 1} of {questions.length}
              </CardTitle>
              <div className="flex items-center space-x-2 text-lg font-semibold">
                <Clock className="h-5 w-5" />
                <span>{formatTime(timer)}</span>
              </div>
            </CardHeader>
          </Card>

          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold text-blue-800">{currentQuestion.question}</h2>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="space-y-6 p-6">
              <RadioGroup
                value={answers[currentQuestion.id] || ""}
                onValueChange={handleAnswerChange}
                disabled={submitted}
              >
                {currentQuestion.options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <RadioGroupItem value={option} id={`option-${index}`} />
                    <Label htmlFor={`option-${index}`}>{option}</Label>
                  </div>
                ))}
              </RadioGroup>
              {submitted && (
                <Alert variant={isAnswerCorrect(currentQuestion.id) ? "default" : "destructive"}>
                  <AlertTitle>
                    {isAnswerCorrect(currentQuestion.id) ? (
                      <CheckCircle className="h-4 w-4 inline-block mr-2" />
                    ) : (
                      <XCircle className="h-4 w-4 inline-block mr-2" />
                    )}
                    {isAnswerCorrect(currentQuestion.id) ? "Correct!" : "Incorrect"}
                  </AlertTitle>
                  <AlertDescription>
                    The correct answer is: {currentQuestion.correctAnswer}
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <div className="flex justify-between w-full">
                <Button
                  onClick={handlePrevious}
                  disabled={currentQuestionIndex === 0 || submitted}
                  variant="outline"
                >
                  <ChevronLeft className="mr-2 h-4 w-4" /> Previous
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={currentQuestionIndex === questions.length - 1 || submitted}
                >
                  Next <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              {!submitted && (
                <Button 
                  onClick={handleSubmit} 
                  className="w-full"
                  disabled={Object.keys(answers).length !== questions.length}
                >
                  Submit Test
                </Button>
              )}
              {submitted && (
                <Alert>
                  <AlertTitle>Test Completed</AlertTitle>
                  <AlertDescription>
                    Your score: {score} out of {questions.length}
                    <br />
                    Time taken: {formatTime(timer)}
                  </AlertDescription>
                </Alert>
              )}
            </CardFooter>
          </Card>

        </div>
        <Camera/>
      </div>
    </div>
  )
}
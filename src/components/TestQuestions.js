import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChevronLeft, ChevronRight, CheckCircle, XCircle, Clock } from 'lucide-react'
// import Camera from './Camera'

const TestQuestions = () => {
  const [questions, setQuestions] = useState([]) // State to hold questions
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState(0)
  const [timer, setTimer] = useState(0)
  const [loading, setLoading] = useState(true) // State to track loading

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(`${process.env.API_URL}api/tests/66e558d57cc5f34db811fda9`);
        if (!response.ok) {
          throw new Error('Failed to fetch questions');
        }
        const data = await response.json();
        console.log(data);
        setQuestions(data.questions); // Set questions from API response
      } catch (error) {
        console.error("Error fetching questions:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchQuestions(); // Fetch questions on component mount
  }, []);

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
      [currentQuestion._id]: value // Use _id for answers
    })
  }

  const handleSubmit = () => {
    let newScore = 0
    questions.forEach(question => {
      if (answers[question._id] === question.options[question.correctAnswer]) { // Compare with correct answer
        newScore++
      }
    })
    setScore(newScore)
    setSubmitted(true)
  }

  const isAnswerCorrect = (questionId) => {
    return answers[questionId] === questions.find(q => q._id === questionId).options[questions.find(q => q._id === questionId).correctAnswer]; // Check against correct answer
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>; // Show loading state
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
                key={question._id}
                variant="ghost"
                className={`w-full justify-start mb-2 ${
                  index === currentQuestionIndex ? 'bg-gray-100' : ''
                } ${
                  answers[question._id] 
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
                value={answers[currentQuestion._id] || ""}
                onValueChange={handleAnswerChange}
                disabled={submitted}
              >
                {currentQuestion.options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <RadioGroupItem value={index.toString()} id={`option-${index}`} /> {/* Use index as value */}
                    <Label htmlFor={`option-${index}`}>{option}</Label>
                  </div>
                ))}
              </RadioGroup>
              {submitted && (
                <Alert variant={isAnswerCorrect(currentQuestion._id) ? "default" : "destructive"}>
                  <AlertTitle>
                    {isAnswerCorrect(currentQuestion._id) ? (
                      <CheckCircle className="h-4 w-4 inline-block mr-2" />
                    ) : (
                      <XCircle className="h-4 w-4 inline-block mr-2" />
                    )}
                    {isAnswerCorrect(currentQuestion._id) ? "Correct!" : "Incorrect"}
                  </AlertTitle>
                  <AlertDescription>
                    The correct answer is: {currentQuestion.options[currentQuestion.correctAnswer]}
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
        {/* <Camera/> */}
      </div>
    </div>
  )
};

export default TestQuestions;
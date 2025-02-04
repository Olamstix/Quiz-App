"use client";

import { useState, useEffect } from "react";
import { Button } from "@/app/Button";
import { Card, CardContent } from "@/app/Card";

interface Question {
    id: number;
    text: string;
    type: "multiple-choice" | "true-false" | "short-answer";
    options?: string[];
    answer?: string;
}

export default function QuizSurveyApp() {
    const [questions, setQuestions] = useState<Question[]>(() => {
        const savedQuestions = localStorage.getItem("quiz_questions");
        return savedQuestions ? JSON.parse(savedQuestions) : [];
    });
    const [newQuestion, setNewQuestion] = useState<string>("");
    const [questionType, setQuestionType] = useState<
        "multiple-choice" | "true-false" | "short-answer"
    >("short-answer");
    const [newOptions, setNewOptions] = useState<string>("");

    useEffect(() => {
        localStorage.setItem("quiz_questions", JSON.stringify(questions));
    }, [questions]);

    const addQuestion = () => {
        if (newQuestion.trim() === "") return;
        const options = questionType === "multiple-choice" ? newOptions.split(",") : [];
        setQuestions((prev) => [
            ...prev,
            { id: Date.now(), text: newQuestion, type: questionType, options },
        ]);
        setNewQuestion("");
        setNewOptions("");
    };

    const deleteQuestion = (id: number) => {
        setQuestions(questions.filter((q) => q.id !== id));
    };

    const editQuestion = (id: number, newText: string) => {
        setQuestions(questions.map(q => q.id === id ? { ...q, text: newText } : q));
    };

    return (
        <div className="p-6 max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Quiz/Survey Generator</h1>
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Enter question"
                    value={newQuestion}
                    onChange={(e) => setNewQuestion(e.target.value)}
                    className="border rounded p-2 w-full"
                />
                <select
                    className="border rounded p-2 w-full mt-2"
                    value={questionType}
                    onChange={(e) => setQuestionType(e.target.value as any)}
                >
                    <option value="multiple-choice">Multiple Choice</option>
                    <option value="true-false">True/False</option>
                    <option value="short-answer">Short Answer</option>
                </select>
                {questionType === "multiple-choice" && (
                    <input
                        type="text"
                        placeholder="Enter options (comma-separated)"
                        value={newOptions}
                        onChange={(e) => setNewOptions(e.target.value)}
                        className="border rounded p-2 w-full mt-2"
                    />
                )}
                <Button className="mt-2 w-full" onClick={addQuestion}>Add Question</Button>
            </div>
            <div>
                {questions.map((q) => (
                    <Card key={q.id} className="mb-2">
                        <CardContent className="p-4">
                            <p className="font-semibold">{q.text}</p>
                            <p className="text-sm text-gray-500">Type: {q.type}</p>
                            {q.options && q.options.length > 0 && (
                                <ul className="mt-2 text-sm">
                                    {q.options.map((option, idx) => (
                                        <li key={idx} className="ml-4 list-disc">{option}</li>
                                    ))}
                                </ul>
                            )}
                            <div className="flex space-x-2 mt-2">
                                <Button onClick={() => deleteQuestion(q.id)}>Delete</Button>
                                <Button onClick={() => editQuestion(q.id, prompt("Edit question:", q.text) || q.text)}>Edit</Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}

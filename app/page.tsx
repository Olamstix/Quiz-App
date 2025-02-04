import QuizSurveyApp from "@/app/QuizSurveyApp";
import { Button } from "./Button";
import { Card } from "./Card";

export default function Home() {
  return (
    <div className="p-6">
      <QuizSurveyApp />
      <Button />
      <Card />
    </div>
  );
}

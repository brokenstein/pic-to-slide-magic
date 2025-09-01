import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FileText, Heart, Activity, Users } from "lucide-react";
import { CombinedAssessmentForm } from "@/components/forms/CombinedAssessmentForm";

const Index = () => {
  console.log('Index component is rendering');
  const [activeForm, setActiveForm] = useState<'home' | 'assessment'>('home');
  console.log('Current activeForm:', activeForm);

  const renderContent = () => {
    switch (activeForm) {
      case 'assessment':
        return <CombinedAssessmentForm onBack={() => setActiveForm('home')} />;
      default:
        return (
          <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8">
              <div className="text-center mb-12">
                <div className="bg-primary text-white rounded-xl p-8 mb-8">
                  <h1 className="text-4xl font-bold mb-4">Healthcare Assessment Forms</h1>
                  <p className="text-xl opacity-90">Comprehensive digital healthcare documentation</p>
                </div>
              </div>

              <div className="max-w-2xl mx-auto">
                <Card className="cursor-pointer" onClick={() => setActiveForm('assessment')}>
                  <CardHeader className="text-center pb-4">
                    <div className="mx-auto mb-4 p-4 bg-primary rounded-full w-20 h-20 flex items-center justify-center">
                      <Activity className="w-10 h-10 text-white" />
                    </div>
                    <CardTitle className="text-3xl">Comprehensive Assessment</CardTitle>
                    <CardDescription className="text-lg">
                      Complete healthcare assessment combining vital signs and ADL evaluation
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-center pb-8">
                    <Button size="lg" className="w-full">
                      Start Comprehensive Assessment
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        );
    }
  };

  return renderContent();
};

export default Index;
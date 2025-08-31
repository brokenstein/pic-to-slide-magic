import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FileText, Heart, Activity, Users } from "lucide-react";
import { CombinedAssessmentForm } from "@/components/forms/CombinedAssessmentForm";

const Index = () => {
  const [activeForm, setActiveForm] = useState<'home' | 'assessment'>('home');

  const renderContent = () => {
    switch (activeForm) {
      case 'assessment':
        return <CombinedAssessmentForm onBack={() => setActiveForm('home')} />;
      default:
        return (
          <div className="min-h-screen bg-gradient-to-br from-background to-medical-light">
            <div className="container mx-auto px-4 py-8">
              {/* Header */}
              <div className="text-center mb-12">
                <div className="bg-gradient-header text-white rounded-xl p-8 shadow-card mb-8">
                  <h1 className="text-4xl font-bold mb-4">Healthcare Assessment Forms</h1>
                  <p className="text-xl opacity-90">Comprehensive digital healthcare documentation</p>
                </div>
              </div>

              {/* Combined Assessment Card */}
              <div className="max-w-2xl mx-auto">
                <Card className="shadow-card hover:shadow-xl transition-all duration-300 cursor-pointer group bg-gradient-card"
                      onClick={() => setActiveForm('assessment')}>
                  <CardHeader className="text-center pb-4">
                    <div className="mx-auto mb-4 p-4 bg-medical-blue rounded-full w-20 h-20 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Activity className="w-10 h-10 text-white" />
                    </div>
                    <CardTitle className="text-3xl text-foreground">Comprehensive Assessment</CardTitle>
                    <CardDescription className="text-medical-gray text-lg">
                      Complete healthcare assessment combining vital signs and ADL evaluation
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-center pb-8">
                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                      <div className="space-y-2">
                        <h4 className="font-semibold text-medical-blue">Vital Signs Assessment</h4>
                        <div className="space-y-1 text-sm text-medical-gray">
                          <p>• Vital Signs Monitoring</p>
                          <p>• Respiratory Assessment</p>
                          <p>• Neurological Evaluation</p>
                          <p>• Physical Examination</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-semibold text-medical-teal">ADL Assessment</h4>
                        <div className="space-y-1 text-sm text-medical-gray">
                          <p>• Ambulation & Mobility</p>
                          <p>• Personal Care Activities</p>
                          <p>• Skin & Wound Assessment</p>
                          <p>• Care Coordination</p>
                        </div>
                      </div>
                    </div>
                    <Button size="lg" className="w-full group-hover:bg-medical-blue transition-colors text-lg py-6">
                      Start Comprehensive Assessment
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Features Section */}
              <div className="mt-16 text-center">
                <Separator className="mb-8" />
                <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
                  <div className="flex flex-col items-center space-y-2">
                    <FileText className="w-8 h-8 text-medical-blue" />
                    <h3 className="font-semibold">Comprehensive Forms</h3>
                    <p className="text-sm text-medical-gray">Combined assessment in one form</p>
                  </div>
                  <div className="flex flex-col items-center space-y-2">
                    <Heart className="w-8 h-8 text-medical-teal" />
                    <h3 className="font-semibold">Complete Patient Care</h3>
                    <p className="text-sm text-medical-gray">Holistic health evaluation</p>
                  </div>
                  <div className="flex flex-col items-center space-y-2">
                    <Activity className="w-8 h-8 text-medical-blue" />
                    <h3 className="font-semibold">Export & Save</h3>
                    <p className="text-sm text-medical-gray">Download formatted reports</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return renderContent();
};

export default Index;
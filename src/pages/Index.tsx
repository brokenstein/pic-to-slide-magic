import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FileText, Heart, Activity, Users } from "lucide-react";
import { ADLAssessmentForm } from "@/components/forms/ADLAssessmentForm";
import { VitalSignsForm } from "@/components/forms/VitalSignsForm";

const Index = () => {
  const [activeForm, setActiveForm] = useState<'home' | 'adl' | 'vitals'>('home');

  const renderContent = () => {
    switch (activeForm) {
      case 'adl':
        return <ADLAssessmentForm onBack={() => setActiveForm('home')} />;
      case 'vitals':
        return <VitalSignsForm onBack={() => setActiveForm('home')} />;
      default:
        return (
          <div className="min-h-screen bg-gradient-to-br from-background to-medical-light">
            <div className="container mx-auto px-4 py-8">
              {/* Header */}
              <div className="text-center mb-12">
                <div className="bg-gradient-header text-white rounded-xl p-8 shadow-card mb-8">
                  <h1 className="text-4xl font-bold mb-4">Healthcare Assessment Forms</h1>
                  <p className="text-xl opacity-90">Digital healthcare documentation made simple</p>
                </div>
              </div>

              {/* Form Selection Cards */}
              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <Card className="shadow-card hover:shadow-xl transition-all duration-300 cursor-pointer group bg-gradient-card"
                      onClick={() => setActiveForm('adl')}>
                  <CardHeader className="text-center pb-4">
                    <div className="mx-auto mb-4 p-4 bg-medical-blue rounded-full w-16 h-16 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Users className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl text-foreground">ADL Assessment</CardTitle>
                    <CardDescription className="text-medical-gray">
                      Activities of Daily Living evaluation form
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-center pb-6">
                    <div className="space-y-2 text-sm text-medical-gray mb-6">
                      <p>• Ambulation & Mobility</p>
                      <p>• Personal Care Activities</p>
                      <p>• Skin & Wound Assessment</p>
                      <p>• Care Coordination</p>
                    </div>
                    <Button variant="outline" className="w-full group-hover:bg-medical-blue group-hover:text-white transition-colors">
                      Start ADL Assessment
                    </Button>
                  </CardContent>
                </Card>

                <Card className="shadow-card hover:shadow-xl transition-all duration-300 cursor-pointer group bg-gradient-card"
                      onClick={() => setActiveForm('vitals')}>
                  <CardHeader className="text-center pb-4">
                    <div className="mx-auto mb-4 p-4 bg-medical-teal rounded-full w-16 h-16 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Activity className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl text-foreground">Vital Signs Assessment</CardTitle>
                    <CardDescription className="text-medical-gray">
                      Comprehensive health vitals documentation
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-center pb-6">
                    <div className="space-y-2 text-sm text-medical-gray mb-6">
                      <p>• Vital Signs Monitoring</p>
                      <p>• Respiratory Assessment</p>
                      <p>• Neurological Evaluation</p>
                      <p>• Physical Examination</p>
                    </div>
                    <Button variant="outline" className="w-full group-hover:bg-medical-teal group-hover:text-white transition-colors">
                      Start Vital Signs Assessment
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
                    <h3 className="font-semibold">Digital Forms</h3>
                    <p className="text-sm text-medical-gray">Paperless documentation</p>
                  </div>
                  <div className="flex flex-col items-center space-y-2">
                    <Heart className="w-8 h-8 text-medical-teal" />
                    <h3 className="font-semibold">Patient Care</h3>
                    <p className="text-sm text-medical-gray">Comprehensive assessments</p>
                  </div>
                  <div className="flex flex-col items-center space-y-2">
                    <Activity className="w-8 h-8 text-medical-blue" />
                    <h3 className="font-semibold">Real-time Data</h3>
                    <p className="text-sm text-medical-gray">Instant form completion</p>
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
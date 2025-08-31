import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Save, Printer } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ADLAssessmentFormProps {
  onBack: () => void;
}

export const ADLAssessmentForm = ({ onBack }: ADLAssessmentFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    ambulation: '',
    bedMobility: '',
    transfer: '',
    toileting: '',
    dressing: '',
    bathing: '',
    ppsPercentage: '',
    palliativePerformance: '',
    skin: '',
    wounds: '',
    ulcerRiskManagement: '',
    teaching: '',
    supervision: '',
    notes: '',
    spokeWith: '',
    careCoordinator: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    toast({
      title: "Assessment Saved",
      description: "ADL Assessment has been saved successfully.",
    });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-medical-light">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button
            onClick={onBack}
            variant="outline"
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Forms
          </Button>
          <div className="flex gap-2">
            <Button onClick={handleSave} className="flex items-center gap-2">
              <Save className="w-4 h-4" />
              Save Assessment
            </Button>
            <Button onClick={handlePrint} variant="outline" className="flex items-center gap-2">
              <Printer className="w-4 h-4" />
              Print
            </Button>
          </div>
        </div>

        <Card className="shadow-card bg-gradient-card">
          <CardHeader className="bg-gradient-header text-white rounded-t-lg">
            <CardTitle className="text-2xl text-center">ADL'S Assessment</CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid gap-6">
              {/* Row 1: Ambulation, Bed Mobility, Transfer, Toileting */}
              <div className="grid md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="ambulation" className="text-sm font-medium">Ambulation:</Label>
                  <Textarea
                    id="ambulation"
                    value={formData.ambulation}
                    onChange={(e) => handleInputChange('ambulation', e.target.value)}
                    className="min-h-[80px] resize-none shadow-form"
                    placeholder="Assessment notes..."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bedMobility" className="text-sm font-medium">Bed Mob:</Label>
                  <Textarea
                    id="bedMobility"
                    value={formData.bedMobility}
                    onChange={(e) => handleInputChange('bedMobility', e.target.value)}
                    className="min-h-[80px] resize-none shadow-form"
                    placeholder="Assessment notes..."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="transfer" className="text-sm font-medium">Transfer:</Label>
                  <Textarea
                    id="transfer"
                    value={formData.transfer}
                    onChange={(e) => handleInputChange('transfer', e.target.value)}
                    className="min-h-[80px] resize-none shadow-form"
                    placeholder="Assessment notes..."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="toileting" className="text-sm font-medium">Toileting:</Label>
                  <Textarea
                    id="toileting"
                    value={formData.toileting}
                    onChange={(e) => handleInputChange('toileting', e.target.value)}
                    className="min-h-[80px] resize-none shadow-form"
                    placeholder="Assessment notes..."
                  />
                </div>
              </div>

              {/* Row 2: Dressing, Bathing */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dressing" className="text-sm font-medium">Dressing:</Label>
                  <Textarea
                    id="dressing"
                    value={formData.dressing}
                    onChange={(e) => handleInputChange('dressing', e.target.value)}
                    className="min-h-[80px] resize-none shadow-form"
                    placeholder="Assessment notes..."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bathing" className="text-sm font-medium">Bathing:</Label>
                  <Textarea
                    id="bathing"
                    value={formData.bathing}
                    onChange={(e) => handleInputChange('bathing', e.target.value)}
                    className="min-h-[80px] resize-none shadow-form"
                    placeholder="Assessment notes..."
                  />
                </div>
              </div>

              {/* Row 3: PPS%, Palliative Performance */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="ppsPercentage" className="text-sm font-medium">PPS%:</Label>
                  <Textarea
                    id="ppsPercentage"
                    value={formData.ppsPercentage}
                    onChange={(e) => handleInputChange('ppsPercentage', e.target.value)}
                    className="min-h-[80px] resize-none shadow-form"
                    placeholder="Assessment notes..."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="palliativePerformance" className="text-sm font-medium">Palliative Performance:</Label>
                  <Textarea
                    id="palliativePerformance"
                    value={formData.palliativePerformance}
                    onChange={(e) => handleInputChange('palliativePerformance', e.target.value)}
                    className="min-h-[80px] resize-none shadow-form"
                    placeholder="Assessment notes..."
                  />
                </div>
              </div>

              {/* Single row fields */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="skin" className="text-sm font-medium">Skin:</Label>
                  <Textarea
                    id="skin"
                    value={formData.skin}
                    onChange={(e) => handleInputChange('skin', e.target.value)}
                    className="min-h-[100px] resize-none shadow-form"
                    placeholder="Assessment notes..."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="wounds" className="text-sm font-medium">Wounds:</Label>
                  <Textarea
                    id="wounds"
                    value={formData.wounds}
                    onChange={(e) => handleInputChange('wounds', e.target.value)}
                    className="min-h-[100px] resize-none shadow-form"
                    placeholder="Assessment notes..."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ulcerRiskManagement" className="text-sm font-medium">Ulcer risk management:</Label>
                  <Textarea
                    id="ulcerRiskManagement"
                    value={formData.ulcerRiskManagement}
                    onChange={(e) => handleInputChange('ulcerRiskManagement', e.target.value)}
                    className="min-h-[100px] resize-none shadow-form"
                    placeholder="Assessment notes..."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="teaching" className="text-sm font-medium">Teaching:</Label>
                  <Textarea
                    id="teaching"
                    value={formData.teaching}
                    onChange={(e) => handleInputChange('teaching', e.target.value)}
                    className="min-h-[100px] resize-none shadow-form"
                    placeholder="Assessment notes..."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="supervision" className="text-sm font-medium">Supervision:</Label>
                  <Textarea
                    id="supervision"
                    value={formData.supervision}
                    onChange={(e) => handleInputChange('supervision', e.target.value)}
                    className="min-h-[100px] resize-none shadow-form"
                    placeholder="Assessment notes..."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes" className="text-sm font-medium">Notes:</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => handleInputChange('notes', e.target.value)}
                    className="min-h-[120px] resize-none shadow-form"
                    placeholder="Additional notes..."
                  />
                </div>
              </div>

              {/* Bottom row: Spoke with, Care Coordinator */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="spokeWith" className="text-sm font-medium">Spoke with:</Label>
                  <Textarea
                    id="spokeWith"
                    value={formData.spokeWith}
                    onChange={(e) => handleInputChange('spokeWith', e.target.value)}
                    className="min-h-[80px] resize-none shadow-form"
                    placeholder="Person contacted..."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="careCoordinator" className="text-sm font-medium">Care Coordinator?</Label>
                  <Textarea
                    id="careCoordinator"
                    value={formData.careCoordinator}
                    onChange={(e) => handleInputChange('careCoordinator', e.target.value)}
                    className="min-h-[80px] resize-none shadow-form"
                    placeholder="Care coordinator details..."
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
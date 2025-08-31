import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Save, Printer } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface VitalSignsFormProps {
  onBack: () => void;
}

export const VitalSignsForm = ({ onBack }: VitalSignsFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    time: '',
    bp: '',
    hr: '',
    rr: '',
    pulseOx: '',
    weight: '',
    mac: '',
    painLevel: '',
    heartEdema: '',
    pulses: '',
    resp: '',
    breathingLungSounds: '',
    oxygenUse: '',
    shortnessOfBreath: '',
    giIncontinentBladderBowel: '',
    lastBM: '',
    bowelSounds: '',
    eatingHabits: '',
    percentage: '',
    alertness: '',
    episodesOfForgetfulness: '',
    musclePain: '',
    weakness: '',
    grp: ''
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
      description: "Vital Signs Assessment has been saved successfully.",
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
            <CardTitle className="text-2xl text-center">Vital Signs Assessment</CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid gap-6">
              {/* Row 1: Name, Date, Time */}
              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium">Name:</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="shadow-form"
                    placeholder="Patient name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date" className="text-sm font-medium">Date:</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleInputChange('date', e.target.value)}
                    className="shadow-form"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time" className="text-sm font-medium">Time:</Label>
                  <Input
                    id="time"
                    type="time"
                    value={formData.time}
                    onChange={(e) => handleInputChange('time', e.target.value)}
                    className="shadow-form"
                  />
                </div>
              </div>

              {/* Row 2: Vitals - BP, HR, RR, Pulse ox */}
              <div className="grid md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bp" className="text-sm font-medium">BP:</Label>
                  <Input
                    id="bp"
                    value={formData.bp}
                    onChange={(e) => handleInputChange('bp', e.target.value)}
                    className="shadow-form"
                    placeholder="120/80"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hr" className="text-sm font-medium">HR:</Label>
                  <Input
                    id="hr"
                    value={formData.hr}
                    onChange={(e) => handleInputChange('hr', e.target.value)}
                    className="shadow-form"
                    placeholder="72"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rr" className="text-sm font-medium">RR:</Label>
                  <Input
                    id="rr"
                    value={formData.rr}
                    onChange={(e) => handleInputChange('rr', e.target.value)}
                    className="shadow-form"
                    placeholder="16"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pulseOx" className="text-sm font-medium">Pulse ox:</Label>
                  <Input
                    id="pulseOx"
                    value={formData.pulseOx}
                    onChange={(e) => handleInputChange('pulseOx', e.target.value)}
                    className="shadow-form"
                    placeholder="98%"
                  />
                </div>
              </div>

              {/* Row 3: Weight, MAC */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="weight" className="text-sm font-medium">Weight:</Label>
                  <Input
                    id="weight"
                    value={formData.weight}
                    onChange={(e) => handleInputChange('weight', e.target.value)}
                    className="shadow-form"
                    placeholder="lbs/kg"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mac" className="text-sm font-medium">MAC:</Label>
                  <Input
                    id="mac"
                    value={formData.mac}
                    onChange={(e) => handleInputChange('mac', e.target.value)}
                    className="shadow-form"
                    placeholder="MAC measurement"
                  />
                </div>
              </div>

              {/* Single row fields */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="painLevel" className="text-sm font-medium">Pain Level:</Label>
                  <Textarea
                    id="painLevel"
                    value={formData.painLevel}
                    onChange={(e) => handleInputChange('painLevel', e.target.value)}
                    className="min-h-[60px] resize-none shadow-form"
                    placeholder="Pain assessment (0-10 scale)"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="heartEdema" className="text-sm font-medium">Heart - Any Edema?</Label>
                  <Textarea
                    id="heartEdema"
                    value={formData.heartEdema}
                    onChange={(e) => handleInputChange('heartEdema', e.target.value)}
                    className="min-h-[60px] resize-none shadow-form"
                    placeholder="Cardiac assessment and edema status"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pulses" className="text-sm font-medium">Pulses:</Label>
                  <Textarea
                    id="pulses"
                    value={formData.pulses}
                    onChange={(e) => handleInputChange('pulses', e.target.value)}
                    className="min-h-[60px] resize-none shadow-form"
                    placeholder="Pulse assessment"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="resp" className="text-sm font-medium">Resp:</Label>
                  <Textarea
                    id="resp"
                    value={formData.resp}
                    onChange={(e) => handleInputChange('resp', e.target.value)}
                    className="min-h-[60px] resize-none shadow-form"
                    placeholder="Respiratory assessment"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="breathingLungSounds" className="text-sm font-medium">Breathing - Lung sounds:</Label>
                  <Textarea
                    id="breathingLungSounds"
                    value={formData.breathingLungSounds}
                    onChange={(e) => handleInputChange('breathingLungSounds', e.target.value)}
                    className="min-h-[60px] resize-none shadow-form"
                    placeholder="Lung sounds assessment"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="oxygenUse" className="text-sm font-medium">Oxygen use:</Label>
                  <Textarea
                    id="oxygenUse"
                    value={formData.oxygenUse}
                    onChange={(e) => handleInputChange('oxygenUse', e.target.value)}
                    className="min-h-[60px] resize-none shadow-form"
                    placeholder="Oxygen therapy details"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="shortnessOfBreath" className="text-sm font-medium">Shortness of breath:</Label>
                  <Textarea
                    id="shortnessOfBreath"
                    value={formData.shortnessOfBreath}
                    onChange={(e) => handleInputChange('shortnessOfBreath', e.target.value)}
                    className="min-h-[60px] resize-none shadow-form"
                    placeholder="Dyspnea assessment"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="giIncontinentBladderBowel" className="text-sm font-medium">GI - Incontinent bladder and/or bowel:</Label>
                  <Textarea
                    id="giIncontinentBladderBowel"
                    value={formData.giIncontinentBladderBowel}
                    onChange={(e) => handleInputChange('giIncontinentBladderBowel', e.target.value)}
                    className="min-h-[60px] resize-none shadow-form"
                    placeholder="Continence status"
                  />
                </div>
              </div>

              {/* Row: Last BM, Bowel sounds */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="lastBM" className="text-sm font-medium">Last BM:</Label>
                  <Textarea
                    id="lastBM"
                    value={formData.lastBM}
                    onChange={(e) => handleInputChange('lastBM', e.target.value)}
                    className="min-h-[60px] resize-none shadow-form"
                    placeholder="Last bowel movement"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bowelSounds" className="text-sm font-medium">Bowel sounds:</Label>
                  <Textarea
                    id="bowelSounds"
                    value={formData.bowelSounds}
                    onChange={(e) => handleInputChange('bowelSounds', e.target.value)}
                    className="min-h-[60px] resize-none shadow-form"
                    placeholder="Bowel sounds assessment"
                  />
                </div>
              </div>

              {/* Row: Eating habits, Percentage */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="eatingHabits" className="text-sm font-medium">Eating habits:</Label>
                  <Textarea
                    id="eatingHabits"
                    value={formData.eatingHabits}
                    onChange={(e) => handleInputChange('eatingHabits', e.target.value)}
                    className="min-h-[60px] resize-none shadow-form"
                    placeholder="Nutritional intake assessment"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="percentage" className="text-sm font-medium">Percentage:</Label>
                  <Textarea
                    id="percentage"
                    value={formData.percentage}
                    onChange={(e) => handleInputChange('percentage', e.target.value)}
                    className="min-h-[60px] resize-none shadow-form"
                    placeholder="Intake percentage"
                  />
                </div>
              </div>

              {/* Row: Alertness, Episodes of forgetfulness */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="alertness" className="text-sm font-medium">Alertness:</Label>
                  <Textarea
                    id="alertness"
                    value={formData.alertness}
                    onChange={(e) => handleInputChange('alertness', e.target.value)}
                    className="min-h-[60px] resize-none shadow-form"
                    placeholder="Mental status assessment"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="episodesOfForgetfulness" className="text-sm font-medium">Episodes of forgetfulness?</Label>
                  <Textarea
                    id="episodesOfForgetfulness"
                    value={formData.episodesOfForgetfulness}
                    onChange={(e) => handleInputChange('episodesOfForgetfulness', e.target.value)}
                    className="min-h-[60px] resize-none shadow-form"
                    placeholder="Memory concerns"
                  />
                </div>
              </div>

              {/* Row: Muscle Pain, Weakness, GRP */}
              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="musclePain" className="text-sm font-medium">Muscle - Pain:</Label>
                  <Textarea
                    id="musclePain"
                    value={formData.musclePain}
                    onChange={(e) => handleInputChange('musclePain', e.target.value)}
                    className="min-h-[60px] resize-none shadow-form"
                    placeholder="Muscle pain assessment"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weakness" className="text-sm font-medium">Weakness:</Label>
                  <Textarea
                    id="weakness"
                    value={formData.weakness}
                    onChange={(e) => handleInputChange('weakness', e.target.value)}
                    className="min-h-[60px] resize-none shadow-form"
                    placeholder="Weakness assessment"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="grp" className="text-sm font-medium">GRP:</Label>
                  <Textarea
                    id="grp"
                    value={formData.grp}
                    onChange={(e) => handleInputChange('grp', e.target.value)}
                    className="min-h-[60px] resize-none shadow-form"
                    placeholder="GRP assessment"
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
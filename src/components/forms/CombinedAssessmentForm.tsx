import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Save, Printer, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import html2pdf from 'html2pdf.js';

interface CombinedAssessmentFormProps {
  onBack: () => void;
}

export const CombinedAssessmentForm = ({ onBack }: CombinedAssessmentFormProps) => {
  const { toast } = useToast();
  const formRef = useRef<HTMLDivElement>(null);
  
  // Combined form data for both assessments
  const [formData, setFormData] = useState({
    // Patient Info (from Vital Signs)
    name: '',
    date: '',
    time: '',
    
    // Vital Signs
    bp: '',
    hr: '',
    rr: '',
    benefitPeriod: '',
    weight: '',
    rmac: '',
    painLevel: '',
    heartEdema: '',
    aicd: '',
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
    grp: '',
    
    // ADL Assessment
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
    bloodSugar: '',
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

  const generateFormattedReport = () => {
    const currentDate = new Date();
    const reportDate = formData.date || currentDate.toISOString().split('T')[0];
    const reportTime = formData.time || currentDate.toLocaleTimeString('en-US', { hour12: false });
    
    return `
HEALTHCARE ASSESSMENT REPORT
============================

PATIENT INFORMATION
-------------------
Name: ${formData.name}
Date: ${reportDate}
Time: ${reportTime}

VITAL SIGNS ASSESSMENT
======================

VITAL SIGNS:
-----------
BP: ${formData.bp}
HR: ${formData.hr}
RR: ${formData.rr}
Benefit period: ${formData.benefitPeriod}

MEASUREMENTS:
------------
Weight: ${formData.weight}
RMAC: ${formData.rmac}

PAIN ASSESSMENT:
---------------
Pain Level: ${formData.painLevel}

CARDIOVASCULAR:
--------------
Heart - Any Edema?: ${formData.heartEdema}
AICD?: ${formData.aicd}
Pulses: ${formData.pulses}

RESPIRATORY:
-----------
Resp: ${formData.resp}
Breathing - Lung sounds: ${formData.breathingLungSounds}
Oxygen use: ${formData.oxygenUse}
Shortness of breath: ${formData.shortnessOfBreath}

GASTROINTESTINAL:
----------------
GI - Incontinent bladder and/or bowel: ${formData.giIncontinentBladderBowel}
Last BM: ${formData.lastBM}
Bowel sounds: ${formData.bowelSounds}

NUTRITION:
---------
Eating habits: ${formData.eatingHabits}
Percentage: ${formData.percentage}

NEUROLOGICAL:
------------
Alertness: ${formData.alertness}
Episodes of forgetfulness?: ${formData.episodesOfForgetfulness}

MUSCULOSKELETAL:
---------------
Muscle - Pain: ${formData.musclePain}
Weakness: ${formData.weakness}
GRP: ${formData.grp}

ADL'S ASSESSMENT
================

MOBILITY & TRANSFERS:
--------------------
Ambulation: ${formData.ambulation}
Bed Mob: ${formData.bedMobility}
Transfer: ${formData.transfer}
Toileting: ${formData.toileting}

PERSONAL CARE:
-------------
Dressing: ${formData.dressing}
Bathing: ${formData.bathing}

PERFORMANCE STATUS:
------------------
PPS%: ${formData.ppsPercentage}
Palliative Performance: ${formData.palliativePerformance}

SKIN & WOUND CARE:
-----------------
Skin: ${formData.skin}
Wounds: ${formData.wounds}
Blood Sugar: ${formData.bloodSugar}
Ulcer risk management: ${formData.ulcerRiskManagement}

CARE COORDINATION:
-----------------
Teaching: ${formData.teaching}
Supervision: ${formData.supervision}
Spoke with: ${formData.spokeWith}
Care Coordinator?: ${formData.careCoordinator}

ADDITIONAL NOTES:
----------------
${formData.notes}

Report generated on: ${currentDate.toLocaleString()}
`;
  };

  const handleSave = () => {
    // Save to localStorage to persist data
    localStorage.setItem('healthcareAssessment', JSON.stringify({
      ...formData,
      savedAt: new Date().toISOString()
    }));
    
    toast({
      title: "Assessment Saved",
      description: "Healthcare Assessment has been saved successfully.",
    });
  };

  const handleDownloadPDF = async () => {
    if (!formRef.current) return;

    const element = formRef.current;
    const opt = {
      margin: [0.2, 0.2, 0.2, 0.2],
      filename: `Healthcare_Assessment_${formData.name || 'Patient'}_${formData.date || new Date().toISOString().split('T')[0]}.pdf`,
      image: { type: 'jpeg', quality: 0.95 },
      html2canvas: { 
        scale: 1.2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        width: 1100,
        height: element.scrollHeight
      },
      jsPDF: { 
        unit: 'in', 
        format: 'a4', 
        orientation: 'landscape',
        compress: true
      },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    };

    try {
      await html2pdf().set(opt).from(element).save();
      toast({
        title: "Form Downloaded",
        description: "Assessment form has been downloaded as PDF with optimized formatting.",
      });
    } catch (error) {
      toast({
        title: "Download Error",
        description: "There was an error downloading the form. Please try again.",
        variant: "destructive",
      });
    }
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
            Back to Home
          </Button>
          <div className="flex gap-2">
            <Button onClick={handleSave} className="flex items-center gap-2">
              <Save className="w-4 h-4" />
              Save Assessment
            </Button>
            <Button onClick={handleDownloadPDF} variant="secondary" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Download Form
            </Button>
            <Button onClick={handlePrint} variant="outline" className="flex items-center gap-2">
              <Printer className="w-4 h-4" />
              Print
            </Button>
          </div>
        </div>

        <Card className="shadow-card bg-gradient-card" ref={formRef}>
          <CardHeader className="bg-gradient-header text-white rounded-t-lg">
            <CardTitle className="text-2xl text-center">Comprehensive Healthcare Assessment</CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid gap-8">
              
              {/* Patient Information Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-medical-blue border-b border-border pb-2">Patient Information</h3>
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
              </div>

              <Separator />

              {/* Vital Signs Assessment Section */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-medical-teal border-b border-border pb-2">Vital Signs Assessment</h3>
                
                {/* Vital Signs Row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  <div className="space-y-1">
                    <Label htmlFor="bp" className="text-xs font-medium">BP:</Label>
                    <Input
                      id="bp"
                      value={formData.bp}
                      onChange={(e) => handleInputChange('bp', e.target.value)}
                      className="shadow-form h-8 text-sm"
                      placeholder="120/80"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="hr" className="text-xs font-medium">HR:</Label>
                    <Input
                      id="hr"
                      value={formData.hr}
                      onChange={(e) => handleInputChange('hr', e.target.value)}
                      className="shadow-form h-8 text-sm"
                      placeholder="72"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="rr" className="text-xs font-medium">RR:</Label>
                    <Input
                      id="rr"
                      value={formData.rr}
                      onChange={(e) => handleInputChange('rr', e.target.value)}
                      className="shadow-form h-8 text-sm"
                      placeholder="16"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="benefitPeriod" className="text-xs font-medium">Benefit period:</Label>
                    <Input
                      id="benefitPeriod"
                      value={formData.benefitPeriod}
                      onChange={(e) => handleInputChange('benefitPeriod', e.target.value)}
                      className="shadow-form h-8 text-sm"
                      placeholder="Benefit period"
                    />
                  </div>
                </div>

                {/* Weight & MAC */}
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
                    <Label htmlFor="rmac" className="text-sm font-medium">RMAC:</Label>
                    <Input
                      id="rmac"
                      value={formData.rmac}
                      onChange={(e) => handleInputChange('rmac', e.target.value)}
                      className="shadow-form"
                      placeholder="RMAC measurement"
                    />
                  </div>
                </div>

                {/* Pain Level */}
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

                {/* Heart Assessment */}
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

                {/* AICD Assessment */}
                <div className="space-y-2">
                  <Label htmlFor="aicd" className="text-sm font-medium">AICD?</Label>
                  <Textarea
                    id="aicd"
                    value={formData.aicd}
                    onChange={(e) => handleInputChange('aicd', e.target.value)}
                    className="min-h-[60px] resize-none shadow-form"
                    placeholder="AICD status and details"
                  />
                </div>

                {/* Pulses and Respiratory */}
                <div className="grid md:grid-cols-2 gap-4">
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
                </div>

                {/* Breathing assessments */}
                <div className="space-y-4">
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
                </div>

                {/* GI Assessment */}
                <div className="space-y-4">
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

                  {/* Last BM, Bowel sounds */}
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
                </div>

                {/* Nutrition */}
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

                {/* Neurological */}
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

                {/* Musculoskeletal */}
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

              <Separator />

              {/* ADL Assessment Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-medical-blue border-b border-border pb-2">ADL's Assessment</h3>
                
                {/* Mobility & Transfers */}
                <div className="grid md:grid-cols-4 gap-3">
                  <div className="space-y-1">
                    <Label htmlFor="ambulation" className="text-xs font-medium">Ambulation:</Label>
                    <Textarea
                      id="ambulation"
                      value={formData.ambulation}
                      onChange={(e) => handleInputChange('ambulation', e.target.value)}
                      className="min-h-[60px] resize-none shadow-form text-sm"
                      placeholder="Assessment notes..."
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="bedMobility" className="text-xs font-medium">Bed Mob:</Label>
                    <Textarea
                      id="bedMobility"
                      value={formData.bedMobility}
                      onChange={(e) => handleInputChange('bedMobility', e.target.value)}
                      className="min-h-[60px] resize-none shadow-form text-sm"
                      placeholder="Assessment notes..."
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="transfer" className="text-xs font-medium">Transfer:</Label>
                    <Textarea
                      id="transfer"
                      value={formData.transfer}
                      onChange={(e) => handleInputChange('transfer', e.target.value)}
                      className="min-h-[60px] resize-none shadow-form text-sm"
                      placeholder="Assessment notes..."
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="toileting" className="text-xs font-medium">Toileting:</Label>
                    <Textarea
                      id="toileting"
                      value={formData.toileting}
                      onChange={(e) => handleInputChange('toileting', e.target.value)}
                      className="min-h-[60px] resize-none shadow-form text-sm"
                      placeholder="Assessment notes..."
                    />
                  </div>
                </div>

                {/* Personal Care & Performance Status */}
                <div className="grid md:grid-cols-4 gap-3">
                  <div className="space-y-1">
                    <Label htmlFor="dressing" className="text-xs font-medium">Dressing:</Label>
                    <Textarea
                      id="dressing"
                      value={formData.dressing}
                      onChange={(e) => handleInputChange('dressing', e.target.value)}
                      className="min-h-[60px] resize-none shadow-form text-sm"
                      placeholder="Assessment notes..."
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="bathing" className="text-xs font-medium">Bathing:</Label>
                    <Textarea
                      id="bathing"
                      value={formData.bathing}
                      onChange={(e) => handleInputChange('bathing', e.target.value)}
                      className="min-h-[60px] resize-none shadow-form text-sm"
                      placeholder="Assessment notes..."
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="ppsPercentage" className="text-xs font-medium">PPS%:</Label>
                    <Textarea
                      id="ppsPercentage"
                      value={formData.ppsPercentage}
                      onChange={(e) => handleInputChange('ppsPercentage', e.target.value)}
                      className="min-h-[60px] resize-none shadow-form text-sm"
                      placeholder="Assessment notes..."
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="palliativePerformance" className="text-xs font-medium">Palliative Performance:</Label>
                    <Textarea
                      id="palliativePerformance"
                      value={formData.palliativePerformance}
                      onChange={(e) => handleInputChange('palliativePerformance', e.target.value)}
                      className="min-h-[60px] resize-none shadow-form text-sm"
                      placeholder="Assessment notes..."
                    />
                  </div>
                </div>

                {/* Skin Assessment */}
                <div className="space-y-2">
                  <Label htmlFor="skin" className="text-sm font-medium">Skin:</Label>
                  <Textarea
                    id="skin"
                    value={formData.skin}
                    onChange={(e) => handleInputChange('skin', e.target.value)}
                    className="min-h-[60px] resize-none shadow-form"
                    placeholder="Skin assessment notes..."
                  />
                </div>

                {/* Wound Care & Blood Sugar */}
                <div className="grid md:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <Label htmlFor="wounds" className="text-xs font-medium">Wounds:</Label>
                    <Textarea
                      id="wounds"
                      value={formData.wounds}
                      onChange={(e) => handleInputChange('wounds', e.target.value)}
                      className="min-h-[60px] resize-none shadow-form text-sm"
                      placeholder="Wound assessment..."
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="bloodSugar" className="text-xs font-medium">Blood Sugar:</Label>
                    <Textarea
                      id="bloodSugar"
                      value={formData.bloodSugar}
                      onChange={(e) => handleInputChange('bloodSugar', e.target.value)}
                      className="min-h-[60px] resize-none shadow-form text-sm"
                      placeholder="Blood sugar levels..."
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="ulcerRiskManagement" className="text-xs font-medium">Ulcer risk management:</Label>
                    <Textarea
                      id="ulcerRiskManagement"
                      value={formData.ulcerRiskManagement}
                      onChange={(e) => handleInputChange('ulcerRiskManagement', e.target.value)}
                      className="min-h-[60px] resize-none shadow-form text-sm"
                      placeholder="Ulcer risk notes..."
                    />
                  </div>
                </div>

                {/* Care Coordination */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="teaching" className="text-sm font-medium">Teaching:</Label>
                    <Textarea
                      id="teaching"
                      value={formData.teaching}
                      onChange={(e) => handleInputChange('teaching', e.target.value)}
                      className="min-h-[60px] resize-none shadow-form"
                      placeholder="Teaching provided..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="supervision" className="text-sm font-medium">Supervision:</Label>
                    <Textarea
                      id="supervision"
                      value={formData.supervision}
                      onChange={(e) => handleInputChange('supervision', e.target.value)}
                      className="min-h-[60px] resize-none shadow-form"
                      placeholder="Supervision notes..."
                    />
                  </div>
                </div>

                {/* Communication */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="spokeWith" className="text-sm font-medium">Spoke with:</Label>
                    <Textarea
                      id="spokeWith"
                      value={formData.spokeWith}
                      onChange={(e) => handleInputChange('spokeWith', e.target.value)}
                      className="min-h-[50px] resize-none shadow-form"
                      placeholder="Person contacted..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="careCoordinator" className="text-sm font-medium">Care Coordinator?</Label>
                    <Textarea
                      id="careCoordinator"
                      value={formData.careCoordinator}
                      onChange={(e) => handleInputChange('careCoordinator', e.target.value)}
                      className="min-h-[50px] resize-none shadow-form"
                      placeholder="Care coordinator details..."
                    />
                  </div>
                </div>

                {/* Notes */}
                <div className="space-y-2">
                  <Label htmlFor="notes" className="text-sm font-medium">Notes:</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => handleInputChange('notes', e.target.value)}
                    className="min-h-[80px] resize-none shadow-form"
                    placeholder="Additional notes..."
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
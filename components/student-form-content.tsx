'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Upload } from 'lucide-react';
import { classrooms, parents, getStudentById } from '@/lib/mock-data';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

export function StudentFormContent({ mode, studentId }: { mode: 'create' | 'edit'; studentId?: string }) {
  const router = useRouter();
  const student = mode === 'edit' && studentId ? getStudentById(studentId) : null;

  const [formData, setFormData] = useState({
    prenom: student?.prenom || '',
    nom: student?.nom || '',
    matricule: student?.matricule || `EL${Math.floor(1000 + Math.random() * 9000)}`,
    dateNaissance: student?.dateNaissance || '',
    classroomId: student?.classroomId || '',
    statut: student?.statut || 'actif',
    parentIds: student?.parentIds || [],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/students');
  };

  const toggleParent = (parentId: string) => {
    setFormData(prev => ({
      ...prev,
      parentIds: prev.parentIds.includes(parentId)
        ? prev.parentIds.filter(id => id !== parentId)
        : [...prev.parentIds, parentId],
    }));
  };

  return (
    <div className="max-w-3xl mx-auto space-y-5 sm:space-y-6 animate-fade-in">
      <div className="flex items-center gap-3 sm:gap-4">
        <Link href="/students">
          <Button variant="ghost" size="sm" className="gap-1.5 rounded-xl">
            <ArrowLeft className="h-4 w-4" /> <span className="hidden sm:inline">Retour</span>
          </Button>
        </Link>
        <h1 className="text-xl sm:text-2xl font-bold text-foreground truncate">
          {mode === 'create' ? 'Nouvel élève' : 'Modifier l\'élève'}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
        {/* Personal info */}
        <Card className="p-4 sm:p-6 shadow-card rounded-2xl">
          <h3 className="font-semibold text-foreground mb-4 text-sm sm:text-base">Informations personnelles</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <Label htmlFor="prenom" className="text-sm">Prénom *</Label>
              <Input
                id="prenom"
                value={formData.prenom}
                onChange={e => setFormData({ ...formData, prenom: e.target.value })}
                required
                className="mt-1.5 rounded-xl"
              />
            </div>
            <div>
              <Label htmlFor="nom" className="text-sm">Nom *</Label>
              <Input
                id="nom"
                value={formData.nom}
                onChange={e => setFormData({ ...formData, nom: e.target.value })}
                required
                className="mt-1.5 rounded-xl"
              />
            </div>
            <div>
              <Label htmlFor="matricule" className="text-sm">Matricule</Label>
              <Input
                id="matricule"
                value={formData.matricule}
                onChange={e => setFormData({ ...formData, matricule: e.target.value })}
                className="mt-1.5 rounded-xl font-mono"
              />
            </div>
            <div>
              <Label htmlFor="dateNaissance" className="text-sm">Date de naissance *</Label>
              <Input
                id="dateNaissance"
                type="date"
                value={formData.dateNaissance}
                onChange={e => setFormData({ ...formData, dateNaissance: e.target.value })}
                required
                className="mt-1.5 rounded-xl"
              />
            </div>
          </div>
        </Card>

        {/* Class + status */}
        <Card className="p-4 sm:p-6 shadow-card rounded-2xl">
          <h3 className="font-semibold text-foreground mb-4 text-sm sm:text-base">Scolarité</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <Label htmlFor="classroomId" className="text-sm">Classe *</Label>
              <select
                id="classroomId"
                value={formData.classroomId}
                onChange={e => setFormData({ ...formData, classroomId: e.target.value })}
                required
                className="mt-1.5 w-full rounded-xl border border-input bg-muted/30 px-3 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/15 transition-all"
              >
                <option value="">Sélectionner une classe</option>
                {classrooms.map(c => (
                  <option key={c.id} value={c.id}>{c.nom} ({c.niveau})</option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="statut" className="text-sm">Statut</Label>
              <select
                id="statut"
                value={formData.statut}
                onChange={e => setFormData({ ...formData, statut: e.target.value as 'actif' | 'inactif' })}
                className="mt-1.5 w-full rounded-xl border border-input bg-muted/30 px-3 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/15 transition-all"
              >
                <option value="actif">Actif</option>
                <option value="inactif">Inactif</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Photo upload */}
        <Card className="p-4 sm:p-6 shadow-card rounded-2xl">
          <h3 className="font-semibold text-foreground mb-4 text-sm sm:text-base">Photo</h3>
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/15 to-info/10 text-primary text-xl sm:text-2xl font-bold shrink-0">
              {formData.prenom && formData.nom ? `${formData.prenom[0]}${formData.nom[0]}` : '?'}
            </div>
            <div className="min-w-0">
              <Button type="button" variant="outline" size="sm" className="gap-1.5 rounded-xl">
                <Upload className="h-4 w-4" /> <span className="hidden sm:inline">Téléverser une photo</span><span className="sm:hidden">Photo</span>
              </Button>
              <p className="text-xs text-muted-foreground mt-1.5">JPG, PNG max 2MB</p>
            </div>
          </div>
        </Card>

        {/* Parents */}
        <Card className="p-4 sm:p-6 shadow-card rounded-2xl">
          <h3 className="font-semibold text-foreground mb-4 text-sm sm:text-base">Parents / Tuteurs</h3>
          <div className="space-y-2 max-h-[300px] overflow-y-auto scrollbar-thin">
            {parents.map(p => {
              const isSelected = formData.parentIds.includes(p.id);
              return (
                <label
                  key={p.id}
                  className={cn(
                    'flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all',
                    isSelected ? 'border-primary bg-primary/5 ring-1 ring-primary/20' : 'border-border hover:bg-muted/50'
                  )}
                >
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => toggleParent(p.id)}
                    className="rounded border-input shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{p.nom}</p>
                    <p className="text-xs text-muted-foreground truncate">{p.telephone} · {p.profession}</p>
                  </div>
                </label>
              );
            })}
          </div>
        </Card>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3">
          <Link href="/students">
            <Button type="button" variant="outline" className="rounded-xl">Annuler</Button>
          </Link>
          <Button type="submit" className="gap-1.5 rounded-xl active:scale-[0.97]">
            <Save className="h-4 w-4" />
            {mode === 'create' ? 'Créer l\'élève' : 'Enregistrer'}
          </Button>
        </div>
      </form>
    </div>
  );
}

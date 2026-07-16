'use client';

import Link from 'next/link';
import { ArrowLeft, Pencil, Phone, MapPin, Calendar, FileText, GraduationCap, Wallet, CheckSquare, ClipboardList, Download } from 'lucide-react';
import { getStudentById, getClassroomName, getParentNames, parents, invoices, payments, attendance, grades, assessments, getSubjectName, formatMoney } from '@/lib/mock-data';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const attendanceColors: Record<string, string> = {
  present: 'bg-success/10 text-success',
  absent: 'bg-destructive/10 text-destructive',
  retard: 'bg-warning/10 text-warning',
  justifie: 'bg-muted text-muted-foreground',
};

const attendanceLabels: Record<string, string> = {
  present: 'Présent',
  absent: 'Absent',
  retard: 'Retard',
  justifie: 'Justifié',
};

export function StudentDetailContent({ studentId }: { studentId: string }) {
  const student = getStudentById(studentId);
  if (!student) return null;

  const classroom = getClassroomName(student.classroomId);
  const parentNames = getParentNames(student.id);
  const studentParents = parents.filter(p => student.parentIds.includes(p.id));
  const studentInvoices = invoices.filter(inv => inv.studentId === student.id);
  const studentPayments = payments.filter(p => studentInvoices.some(inv => inv.id === p.invoiceId));
  const studentAttendance = attendance.filter(a => a.studentId === student.id);
  const studentGrades = grades.filter(g => g.studentId === student.id);
  const studentAssessments = studentGrades.map(g => assessments.find(a => a.id === g.assessmentId)).filter(Boolean);

  const avgGrade = studentGrades.length > 0
    ? (studentGrades.reduce((sum, g) => sum + g.note, 0) / studentGrades.length).toFixed(2)
    : '—';

  const totalPaid = studentInvoices.reduce((sum, inv) => sum + inv.montantPaye, 0);
  const totalDue = studentInvoices.reduce((sum, inv) => sum + inv.resteAPayer, 0);

  const tabs = [
    { id: 'info', label: 'Informations', icon: GraduationCap },
    { id: 'attendance', label: 'Présences', icon: CheckSquare },
    { id: 'grades', label: 'Notes', icon: ClipboardList },
    { id: 'payments', label: 'Paiements', icon: Wallet },
    { id: 'documents', label: 'Documents', icon: FileText },
  ];

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
      <div className="flex items-center gap-3 sm:gap-4">
        <Link href="/students">
          <Button variant="ghost" size="sm" className="gap-1.5 rounded-xl">
            <ArrowLeft className="h-4 w-4" /> <span className="hidden sm:inline">Retour</span>
          </Button>
        </Link>
      </div>

      {/* Header card */}
      <Card className="p-4 sm:p-6 rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300">
        <div className="flex flex-col sm:flex-row sm:items-start gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/15 to-info/10 text-primary text-xl font-bold shrink-0">
            {student.prenom[0]}{student.nom[0]}
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-xl sm:text-2xl font-bold text-foreground truncate">{student.prenom} {student.nom}</h1>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-1.5">
              <span className="text-sm text-muted-foreground font-mono truncate">{student.matricule}</span>
              <Badge variant="secondary" className="badge-modern">{classroom}</Badge>
              <span className={cn(
                'badge-modern',
                student.statut === 'actif' ? 'bg-success/10 text-success' : 'bg-muted text-muted-foreground'
              )}>
                {student.statut === 'actif' ? 'Actif' : 'Inactif'}
              </span>
            </div>
            <div className="flex flex-wrap gap-3 sm:gap-4 mt-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5 truncate">
                <Calendar className="h-4 w-4 shrink-0" />
                <span className="truncate">{new Date(student.dateNaissance).toLocaleDateString('fr-FR')}</span>
              </span>
            </div>
          </div>
          <Link href={`/students/${student.id}/edit`} className="shrink-0">
            <Button variant="outline" size="sm" className="gap-1.5 rounded-xl">
              <Pencil className="h-4 w-4" /> <span className="hidden sm:inline">Modifier</span>
            </Button>
          </Link>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-5 sm:mt-6 pt-5 sm:pt-6 border-t border-border">
          <div className="min-w-0">
            <p className="text-xs text-muted-foreground truncate">Moyenne générale</p>
            <p className="text-lg font-bold text-foreground mt-0.5 truncate">{avgGrade}<span className="text-sm text-muted-foreground">/20</span></p>
          </div>
          <div className="min-w-0">
            <p className="text-xs text-muted-foreground truncate">Présences</p>
            <p className="text-lg font-bold text-foreground mt-0.5 truncate">{studentAttendance.filter(a => a.statut === 'present').length}<span className="text-sm text-muted-foreground">/{studentAttendance.length}</span></p>
          </div>
          <div className="min-w-0">
            <p className="text-xs text-muted-foreground truncate">Total payé</p>
            <p className="text-lg font-bold text-success mt-0.5 truncate">{formatMoney(totalPaid)}</p>
          </div>
          <div className="min-w-0">
            <p className="text-xs text-muted-foreground truncate">Reste à payer</p>
            <p className="text-lg font-bold text-destructive mt-0.5 truncate">{formatMoney(totalDue)}</p>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Left: tabs content */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          {/* Info */}
          <Card className="p-4 sm:p-5 rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300">
            <h3 className="font-semibold text-foreground text-sm sm:text-base mb-4">Informations personnelles</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">Nom</p>
                <p className="text-sm text-foreground mt-0.5 truncate">{student.nom}</p>
              </div>
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">Prénom</p>
                <p className="text-sm text-foreground mt-0.5 truncate">{student.prenom}</p>
              </div>
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">Date de naissance</p>
                <p className="text-sm text-foreground mt-0.5 truncate">{new Date(student.dateNaissance).toLocaleDateString('fr-FR')}</p>
              </div>
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">Matricule</p>
                <p className="text-sm text-foreground mt-0.5 font-mono truncate">{student.matricule}</p>
              </div>
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">Classe</p>
                <p className="text-sm text-foreground mt-0.5 truncate">{classroom}</p>
              </div>
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">Statut</p>
                <p className="text-sm text-foreground mt-0.5 truncate">{student.statut === 'actif' ? 'Actif' : 'Inactif'}</p>
              </div>
            </div>
          </Card>

          {/* Attendance */}
          <Card className="p-4 sm:p-5 rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300">
            <h3 className="font-semibold text-foreground text-sm sm:text-base mb-4">Présences récentes</h3>
            {studentAttendance.length > 0 ? (
              <div className="space-y-1.5 max-h-[320px] overflow-y-auto scrollbar-thin">
                {studentAttendance.map(a => (
                  <div key={a.id} className="flex items-center justify-between p-2.5 rounded-xl hover:bg-muted/50 transition-colors">
                    <span className="text-sm text-foreground truncate">{new Date(a.date).toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' })}</span>
                    <span className={cn('badge-modern shrink-0', attendanceColors[a.statut])}>
                      {attendanceLabels[a.statut]}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Aucune présence enregistrée</p>
            )}
          </Card>

          {/* Grades */}
          <Card className="p-4 sm:p-5 rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300">
            <h3 className="font-semibold text-foreground text-sm sm:text-base mb-4">Notes</h3>
            {studentGrades.length > 0 ? (
              <div className="space-y-1.5 max-h-[320px] overflow-y-auto scrollbar-thin">
                {studentGrades.map(g => {
                  const assessment = assessments.find(a => a.id === g.assessmentId);
                  if (!assessment) return null;
                  return (
                    <div key={g.id} className="flex items-center justify-between p-2.5 rounded-xl hover:bg-muted/50 transition-colors">
                      <div className="min-w-0">
                        <p className="text-sm text-foreground truncate">{assessment.libelle}</p>
                        <p className="text-xs text-muted-foreground truncate">{getSubjectName(assessment.subjectId)} · Coef. {assessment.coefficient}</p>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <span className={cn(
                          'text-lg font-bold',
                          g.note >= 10 ? 'text-success' : 'text-destructive'
                        )}>{g.note}</span>
                        <span className="text-xs text-muted-foreground">/20</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Aucune note enregistrée</p>
            )}
          </Card>

          {/* Payments */}
          <Card className="p-4 sm:p-5 rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300">
            <h3 className="font-semibold text-foreground text-sm sm:text-base mb-4">Paiements</h3>
            {studentInvoices.length > 0 ? (
              <div className="space-y-1.5 max-h-[320px] overflow-y-auto scrollbar-thin">
                {studentInvoices.map(inv => (
                  <div key={inv.id} className="flex items-center justify-between p-2.5 rounded-xl hover:bg-muted/50 transition-colors">
                    <div className="min-w-0">
                      <p className="text-sm text-foreground capitalize truncate">{inv.typeFrais}</p>
                      <p className="text-xs text-muted-foreground truncate">Émis le {new Date(inv.dateEmission).toLocaleDateString('fr-FR')}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm font-medium text-foreground truncate">{formatMoney(inv.montantPaye)} / {formatMoney(inv.montantTotal)}</p>
                      <span className={cn(
                        'badge-modern',
                        inv.statut === 'paye' ? 'bg-success/10 text-success' :
                        inv.statut === 'partiel' ? 'bg-warning/10 text-warning' :
                        'bg-destructive/10 text-destructive'
                      )}>
                        {inv.statut === 'paye' ? 'Payé' : inv.statut === 'partiel' ? 'Partiel' : 'Impayé'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Aucune facture</p>
            )}
          </Card>
        </div>

        {/* Right: parents + documents */}
        <div className="space-y-4 sm:space-y-6">
          <Card className="p-4 sm:p-5 rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300">
            <h3 className="font-semibold text-foreground text-sm sm:text-base mb-4">Parents / Tuteurs</h3>
            <div className="space-y-3 max-h-[400px] overflow-y-auto scrollbar-thin">
              {studentParents.map(p => (
                <div key={p.id} className="p-3 rounded-xl border border-border">
                  <p className="text-sm font-medium text-foreground truncate">{p.nom}</p>
                  <div className="mt-2 space-y-1.5">
                    <p className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Phone className="h-3.5 w-3.5 shrink-0" /> <span className="truncate">{p.telephone}</span>
                    </p>
                    <p className="flex items-center gap-2 text-xs text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5 shrink-0" /> <span className="truncate-2">{p.adresse}</span>
                    </p>
                    <p className="text-xs text-muted-foreground truncate">Profession: {p.profession}</p>
                  </div>
                </div>
              ))}
              {studentParents.length === 0 && (
                <p className="text-sm text-muted-foreground">Aucun parent lié</p>
              )}
            </div>
          </Card>

          <Card className="p-4 sm:p-5 rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300">
            <h3 className="font-semibold text-foreground text-sm sm:text-base mb-4">Documents</h3>
            <div className="space-y-1.5 max-h-[280px] overflow-y-auto scrollbar-thin">
              {student.documents.map(doc => (
                <div key={doc.id} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-muted/50 transition-colors">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-info/10 shrink-0">
                    <FileText className="h-4 w-4 text-info" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground truncate">{doc.nom}</p>
                    <p className="text-xs text-muted-foreground truncate">{doc.type} · {new Date(doc.dateAjout).toLocaleDateString('fr-FR')}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-border space-y-2">
              <p className="text-xs font-medium text-foreground mb-2">Générer un document officiel</p>
              <Button variant="outline" size="sm" className="w-full gap-1.5 justify-start rounded-xl">
                <FileText className="h-4 w-4" /> <span className="truncate">Certificat de scolarité</span>
              </Button>
              <Button variant="outline" size="sm" className="w-full gap-1.5 justify-start rounded-xl">
                <FileText className="h-4 w-4" /> <span className="truncate">Carte scolaire</span>
              </Button>
              <Button variant="outline" size="sm" className="w-full gap-1.5 justify-start rounded-xl">
                <Download className="h-4 w-4" /> <span className="truncate">Bulletin PDF</span>
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

import type {
  School, User, AcademicYear, Term, Student, Parent, Teacher,
  Classroom, Subject, Attendance, Assessment, Grade, Invoice,
  Payment, Notification, Announcement, DashboardStats,
} from './types';

export const schools: School[] = [
  {
    id: 's1',
    nom: 'École Mixte Lumumba',
    logo: '',
    adresse: 'Av. de la victoire, Brazzaville',
    telephone: '+243 81 234 5678',
    statutAbonnement: 'actif',
    dateCreation: '2021-09-01',
  },
  {
    id: 's2',
    nom: 'Collège Notre-Dame de Grâce',
    logo: '',
    adresse: 'Rue de l\'Indépendance, Lubumbashi',
    telephone: '+243 82 345 6789',
    statutAbonnement: 'essai',
    dateCreation: '2023-01-15',
  },
];

export const currentUser: User = {
  id: 'u1',
  schoolId: 's1',
  nom: 'Joseph Kabasele',
  email: 'joseph.kabasele@kelasi.com',
  telephone: '+243 81 234 5678',
  role: 'school_admin',
  statut: 'actif',
};

export const users: User[] = [
  currentUser,
  { id: 'u2', schoolId: 's1', nom: 'Marie Kalala', email: 'marie.kalala@kelasi.com', telephone: '+243 81 111 2222', role: 'secretary', statut: 'actif' },
  { id: 'u3', schoolId: 's1', nom: 'Pierre Mbuyi', email: 'pierre.mbuyi@kelasi.com', telephone: '+243 81 333 4444', role: 'accountant', statut: 'actif' },
  { id: 'u4', schoolId: 's1', nom: 'Esther Tshala', email: 'esther.tshala@kelasi.com', telephone: '+243 81 555 6666', role: 'teacher', statut: 'actif' },
  { id: 'u5', schoolId: 's1', nom: 'Jean Mukendi', email: 'jean.mukendi@kelasi.com', telephone: '+243 81 777 8888', role: 'parent', statut: 'actif' },
];

export const academicYears: AcademicYear[] = [
  { id: 'ay1', schoolId: 's1', libelle: '2026-2027', dateDebut: '2026-09-01', dateFin: '2027-07-15', statut: 'active' },
  { id: 'ay2', schoolId: 's1', libelle: '2025-2026', dateDebut: '2025-09-01', dateFin: '2026-07-15', statut: 'archivee' },
];

export const terms: Term[] = [
  { id: 't1', schoolId: 's1', academicYearId: 'ay1', libelle: 'Trimestre 1', dateDebut: '2026-09-01', dateFin: '2026-12-15' },
  { id: 't2', schoolId: 's1', academicYearId: 'ay1', libelle: 'Trimestre 2', dateDebut: '2027-01-05', dateFin: '2027-04-05' },
  { id: 't3', schoolId: 's1', academicYearId: 'ay1', libelle: 'Trimestre 3', dateDebut: '2027-04-20', dateFin: '2027-07-15' },
];

export const subjects: Subject[] = [
  { id: 'sub1', schoolId: 's1', nom: 'Mathématiques', coefficient: 4 },
  { id: 'sub2', schoolId: 's1', nom: 'Français', coefficient: 4 },
  { id: 'sub3', schoolId: 's1', nom: 'Histoire-Géographie', coefficient: 2 },
  { id: 'sub4', schoolId: 's1', nom: 'Sciences', coefficient: 3 },
  { id: 'sub5', schoolId: 's1', nom: 'Anglais', coefficient: 2 },
  { id: 'sub6', schoolId: 's1', nom: 'EPS', coefficient: 1 },
  { id: 'sub7', schoolId: 's1', nom: 'Informatique', coefficient: 2 },
];

export const classrooms: Classroom[] = [
  { id: 'c1', schoolId: 's1', niveau: '6ème', nom: '6ème A', salle: 'Salle 101', enseignantPrincipalId: 't1', studentIds: ['st1','st2','st3','st4','st5','st6','st7','st8'] },
  { id: 'c2', schoolId: 's1', niveau: '5ème', nom: '5ème A', salle: 'Salle 102', enseignantPrincipalId: 't2', studentIds: ['st9','st10','st11','st12','st13','st14'] },
  { id: 'c3', schoolId: 's1', niveau: '4ème', nom: '4ème A', salle: 'Salle 201', enseignantPrincipalId: 't1', studentIds: ['st15','st16','st17','st18','st19','st20'] },
  { id: 'c4', schoolId: 's1', niveau: '3ème', nom: '3ème A', salle: 'Salle 202', enseignantPrincipalId: 't3', studentIds: ['st21','st22','st23','st24','st25'] },
];

export const teachers: Teacher[] = [
  { id: 't1', schoolId: 's1', userId: 'u4', nom: 'Tshala', prenom: 'Esther', email: 'esther.tshala@kelasi.com', telephone: '+243 81 555 6666', matiereIds: ['sub1','sub4'], classroomIds: ['c1','c3'], statut: 'actif' },
  { id: 't2', schoolId: 's1', userId: 'u6', nom: 'Mpeza', prenom: 'David', email: 'david.mpeza@kelasi.com', telephone: '+243 81 999 1010', matiereIds: ['sub2','sub5'], classroomIds: ['c2'], statut: 'actif' },
  { id: 't3', schoolId: 's1', userId: 'u7', nom: 'Nkulu', prenom: 'Sarah', email: 'sarah.nkulu@kelasi.com', telephone: '+243 82 121 3141', matiereIds: ['sub3'], classroomIds: ['c4'], statut: 'actif' },
];

export const parents: Parent[] = [
  { id: 'p1', schoolId: 's1', nom: 'Jean Mukendi', telephone: '+243 81 777 8888', email: 'jean.mukendi@gmail.com', adresse: 'Quartier Matonge, Kinshasa', profession: 'Commerçant', studentIds: ['st1','st9'] },
  { id: 'p2', schoolId: 's1', nom: 'Adèle Kabongo', telephone: '+243 82 222 3333', email: 'adele.kabongo@gmail.com', adresse: 'Quartier Lemba, Kinshasa', profession: 'Infirmière', studentIds: ['st2','st3'] },
  { id: 'p3', schoolId: 's1', nom: 'Félix Mwamba', telephone: '+243 81 444 5555', email: 'felix.mwamba@gmail.com', adresse: 'Quartier Bandalungwa, Kinshasa', profession: 'Chauffeur', studentIds: ['st4'] },
  { id: 'p4', schoolId: 's1', nom: 'Claire Ntumba', telephone: '+243 82 666 7777', email: 'claire.ntumba@gmail.com', adresse: 'Quartier Ngaliema, Kinshasa', profession: 'Enseignante', studentIds: ['st5','st15'] },
  { id: 'p5', schoolId: 's1', nom: 'Patrick Ilunga', telephone: '+243 81 888 9999', email: 'patrick.ilunga@gmail.com', adresse: 'Quartier Lemba, Kinshasa', profession: 'Mécanicien', studentIds: ['st6','st10','st16'] },
  { id: 'p6', schoolId: 's1', nom: 'Brigitte Kasongo', telephone: '+243 82 101 2020', email: 'brigitte.kasongo@gmail.com', adresse: 'Quartier Kintambo, Kinshasa', profession: 'Secrétaire', studentIds: ['st7'] },
  { id: 'p7', schoolId: 's1', nom: 'Augustin Mwenze', telephone: '+243 81 303 4040', email: 'augustin.mwenze@gmail.com', adresse: 'Quartier Gombe, Kinshasa', profession: 'Avocat', studentIds: ['st8','st11','st17'] },
  { id: 'p8', schoolId: 's1', nom: 'Solange Tshibangu', telephone: '+243 82 505 6060', email: 'solange.tshibangu@gmail.com', adresse: 'Quartier Lemba, Kinshasa', profession: 'Coiffeuse', studentIds: ['st12'] },
  { id: 'p9', schoolId: 's1', nom: 'Robert Lukusa', telephone: '+243 81 707 8080', email: 'robert.lukusa@gmail.com', adresse: 'Quartier Matonge, Kinshasa', profession: 'Comptable', studentIds: ['st13','st18'] },
  { id: 'p10', schoolId: 's1', nom: 'Nadine Mbiya', telephone: '+243 82 909 0101', email: 'nadine.mbiya@gmail.com', adresse: 'Quartier Ngaba, Kinshasa', profession: 'Vendeuse', studentIds: ['st14','st19','st20'] },
  { id: 'p11', schoolId: 's1', nom: 'Éric Bofando', telephone: '+243 81 121 3141', email: 'eric.bofando@gmail.com', adresse: 'Quartier Selembao, Kinshasa', profession: 'Électricien', studentIds: ['st21'] },
  { id: 'p12', schoolId: 's1', nom: 'Grace Mukeba', telephone: '+243 82 151 6171', email: 'grace.mukeba@gmail.com', adresse: 'Quartier Lemba, Kinshasa', profession: 'Médecin', studentIds: ['st22','st23'] },
  { id: 'p13', schoolId: 's1', nom: 'Daniel Kasawu', telephone: '+243 81 818 9292', email: 'daniel.kasawu@gmail.com', adresse: 'Quartier Bandal, Kinshasa', profession: 'Architecte', studentIds: ['st24','st25'] },
];

const firstNames = ['Aimé','Béatrice','Christian','Divine','Emmanuel','Fanny','Gloire','Hélène','Iris','Joël','Kévin','Larissa','Marc','Nadège','Olivier','Prisca','Quentin','Rachel','Steve','Thérèse','Ulrich','Viviane','Wilson','Yannick','Zoé'];
const lastNames = ['Mukendi','Kabongo','Mwamba','Ntumba','Ilunga','Kasongo','Mwenze','Tshibangu','Lukusa','Mbiya','Bofando','Mukeba','Kasawu','Bakwa','Nkulu','Mpeza','Tshala','Mbuyi','Kalala','Kabasele'];

export const students: Student[] = Array.from({ length: 25 }, (_, i) => {
  const id = `st${i + 1}`;
  let classroomId = 'c1';
  if (i >= 8) classroomId = 'c2';
  if (i >= 14) classroomId = 'c3';
  if (i >= 20) classroomId = 'c4';
  const parentMap: Record<string, string[]> = {
    st1: ['p1'], st2: ['p2'], st3: ['p2'], st4: ['p3'], st5: ['p4'],
    st6: ['p5'], st7: ['p6'], st8: ['p7'], st9: ['p1'], st10: ['p5'],
    st11: ['p7'], st12: ['p8'], st13: ['p9'], st14: ['p10'], st15: ['p4'],
    st16: ['p5'], st17: ['p7'], st18: ['p9'], st19: ['p10'], st20: ['p10'],
    st21: ['p11'], st22: ['p12'], st23: ['p12'], st24: ['p13'], st25: ['p13'],
  };
  return {
    id,
    schoolId: 's1',
    matricule: `EL${String(i + 1).padStart(4, '0')}`,
    nom: lastNames[i % lastNames.length],
    prenom: firstNames[i % firstNames.length],
    dateNaissance: `201${Math.floor(i / 8)}-0${(i % 9) + 1}-1${i % 9}`,
    classroomId,
    statut: i % 20 === 19 ? 'inactif' : 'actif',
    parentIds: parentMap[id] || [],
    documents: [
      { id: `doc${i}-1`, nom: 'Acte de naissance', type: 'PDF', dateAjout: '2026-09-01' },
      { id: `doc${i}-2`, nom: 'Bulletin précédent', type: 'PDF', dateAjout: '2026-09-01' },
    ],
  };
});

const today = new Date().toISOString().split('T')[0];

export const attendance: Attendance[] = students.flatMap((s, i) => {
  const statuses: Attendance['statut'][] = ['present','present','present','present','present','present','absent','retard','present','justifie'];
  return [{
    id: `att${i}`,
    schoolId: 's1',
    studentId: s.id,
    classroomId: s.classroomId,
    date: today,
    statut: statuses[i % statuses.length],
  }];
});

export const assessments: Assessment[] = [
  { id: 'a1', schoolId: 's1', subjectId: 'sub1', classroomId: 'c1', termId: 't1', libelle: 'Devoir 1 - Fractions', date: '2026-10-05', coefficient: 2 },
  { id: 'a2', schoolId: 's1', subjectId: 'sub2', classroomId: 'c1', termId: 't1', libelle: 'Dictée - Semaine 3', date: '2026-10-08', coefficient: 1 },
  { id: 'a3', schoolId: 's1', subjectId: 'sub1', classroomId: 'c1', termId: 't1', libelle: 'Interrogation - Géométrie', date: '2026-10-12', coefficient: 2 },
  { id: 'a4', schoolId: 's1', subjectId: 'sub4', classroomId: 'c1', termId: 't1', libelle: 'TP - Écosystèmes', date: '2026-10-15', coefficient: 1 },
  { id: 'a5', schoolId: 's1', subjectId: 'sub2', classroomId: 'c2', termId: 't1', libelle: 'Rédaction - Mon village', date: '2026-10-06', coefficient: 2 },
  { id: 'a6', schoolId: 's1', subjectId: 'sub5', classroomId: 'c2', termId: 't1', libelle: 'Vocabulary Test 1', date: '2026-10-10', coefficient: 1 },
];

export const grades: Grade[] = assessments.flatMap((a, ai) => {
  const classStudents = students.filter(s => s.classroomId === a.classroomId);
  return classStudents.map((s, si) => ({
    id: `g${a.id}-${s.id}`,
    schoolId: 's1',
    assessmentId: a.id,
    studentId: s.id,
    note: Math.round((8 + ((si * 3 + ai * 2) % 12)) * 2) / 2,
    statutValidation: ai < 2 ? 'publie' : ai < 4 ? 'valide' : 'brouillon',
  }));
});

export const invoices: Invoice[] = students.map((s, i) => {
  const montantTotal = 250000 + (i % 3) * 50000;
  const montantPaye = i % 4 === 0 ? montantTotal : i % 3 === 0 ? Math.floor(montantTotal * 0.5) : i % 2 === 0 ? 100000 : 0;
  const reste = montantTotal - montantPaye;
  return {
    id: `inv${i}`,
    schoolId: 's1',
    studentId: s.id,
    typeFrais: i % 4 === 0 ? 'inscription' : 'scolarite',
    montantTotal,
    montantPaye,
    resteAPayer: reste,
    dateEmission: '2026-09-01',
    statut: reste === 0 ? 'paye' : montantPaye > 0 ? 'partiel' : 'impaye',
  };
});

export const payments: Payment[] = invoices
  .filter(inv => inv.montantPaye > 0)
  .map((inv, i) => ({
    id: `pay${i}`,
    schoolId: 's1',
    invoiceId: inv.id,
    montant: inv.montantPaye,
    datePaiement: `2026-09-0${(i % 9) + 1}`,
    modePaiement: i % 3 === 0 ? 'especes' : i % 3 === 1 ? 'mobile_money' : 'virement',
    partiel: inv.statut === 'partiel',
  }));

export const notifications: Notification[] = [
  { id: 'n1', schoolId: 's1', type: 'paiement', destinataireId: 'p1', canal: 'sms', message: 'Paiement de 250.000 FC reçu pour Aimé Mukendi. Merci!', statut: 'envoye', date: '2026-10-15T08:30:00' },
  { id: 'n2', schoolId: 's1', type: 'absence', destinataireId: 'p2', canal: 'sms', message: 'Votre enfant Béatrice Kabongo était absent(e) aujourd\'hui. Veuillez justifier.', statut: 'envoye', date: '2026-10-15T09:00:00' },
  { id: 'n3', schoolId: 's1', type: 'annonce', destinataireId: 'all', canal: 'in-app', message: 'Réunion parents-professeurs le 25 octobre à 10h.', statut: 'envoye', date: '2026-10-14T14:00:00' },
  { id: 'n4', schoolId: 's1', type: 'bulletin', destinataireId: 'p1', canal: 'email', message: 'Le bulletin du Trimestre 1 de Aimé Mukendi est disponible.', statut: 'en_attente', date: '2026-10-15T10:00:00' },
  { id: 'n5', schoolId: 's1', type: 'nouvel_eleve', destinataireId: 'u1', canal: 'in-app', message: 'Nouvel élève inscrit: Christian Mwamba (6ème A).', statut: 'envoye', date: '2026-10-13T11:00:00' },
  { id: 'n6', schoolId: 's1', type: 'paiement', destinataireId: 'p3', canal: 'sms', message: 'Rappel: frais de scolarité en attente de paiement.', statut: 'echec', date: '2026-10-15T07:00:00' },
];

export const announcements: Announcement[] = [
  { id: 'an1', schoolId: 's1', auteurId: 'u1', auteurNom: 'Joseph Kabasele', cible: 'tous', titre: 'Réunion parents-professeurs', contenu: 'La réunion parents-professeurs se tiendra le 25 octobre 2026 à 10h dans la grande salle. La présence d\'au moins un parent par élève est obligatoire.', datePublication: '2026-10-14T14:00:00' },
  { id: 'an2', schoolId: 's1', auteurId: 'u1', auteurNom: 'Joseph Kabasele', cible: 'parents', titre: 'Paiement des frais du 2ème trimestre', contenu: 'Nous rappelons aux parents que les frais du 2ème trimestre doivent être payés avant le 5 janvier 2027. Merci de votre compréhension.', datePublication: '2026-10-12T09:00:00' },
  { id: 'an3', schoolId: 's1', auteurId: 'u4', auteurNom: 'Esther Tshala', cible: 'classe', titre: 'Sortie pédagogique 6ème A', contenu: 'Une sortie pédagogique est prévue pour la classe de 6ème A le 20 octobre au Parc de la Vallée. Contribution: 5.000 FC par élève.', datePublication: '2026-10-10T16:00:00' },
  { id: 'an4', schoolId: 's1', auteurId: 'u1', auteurNom: 'Joseph Kabasele', cible: 'enseignants', titre: 'Conseil de classe', contenu: 'Le conseil de classe du 1er trimestre se tiendra le 18 décembre à 14h. Préparez vos appréciations.', datePublication: '2026-10-08T10:00:00' },
];

export const dashboardStats: DashboardStats = {
  effectifTotal: 25,
  presentsAujourdhui: 20,
  absentsAujourdhui: 2,
  retardsAujourdhui: 2,
  justifiesAujourdhui: 1,
  paiementsDuJour: 150000,
  impayesTotal: 850000,
  nouveauxElevesMois: 5,
  recettesMensuelles: 3200000,
  recettesParMois: [
    { mois: 'Sep', montant: 2800000 },
    { mois: 'Oct', montant: 3200000 },
    { mois: 'Nov', montant: 2100000 },
    { mois: 'Déc', montant: 1800000 },
    { mois: 'Jan', montant: 2400000 },
    { mois: 'Fév', montant: 1950000 },
  ],
  presencesParClasse: [
    { classe: '6ème A', present: 7, absent: 1, retard: 0, justifie: 0 },
    { classe: '5ème A', present: 5, absent: 0, retard: 1, justifie: 0 },
    { classe: '4ème A', present: 5, absent: 1, retard: 0, justifie: 0 },
    { classe: '3ème A', present: 3, absent: 0, retard: 1, justifie: 1 },
  ],
  repartitionEffectif: [
    { niveau: '6ème', effectif: 8 },
    { niveau: '5ème', effectif: 6 },
    { niveau: '4ème', effectif: 6 },
    { niveau: '3ème', effectif: 5 },
  ],
};

// Helper functions
export function getStudentName(id: string): string {
  const s = students.find(s => s.id === id);
  return s ? `${s.prenom} ${s.nom}` : 'Inconnu';
}

export function getStudentById(id: string) {
  return students.find(s => s.id === id);
}

export function getClassroomName(id: string): string {
  const c = classrooms.find(c => c.id === id);
  return c ? c.nom : 'Inconnu';
}

export function getSubjectName(id: string): string {
  const s = subjects.find(s => s.id === id);
  return s ? s.nom : 'Inconnu';
}

export function getTeacherName(id: string): string {
  const t = teachers.find(t => t.id === id);
  return t ? `${t.prenom} ${t.nom}` : 'Inconnu';
}

export function getParentNames(studentId: string): string[] {
  const s = students.find(s => s.id === studentId);
  if (!s) return [];
  return s.parentIds.map(pid => {
    const p = parents.find(p => p.id === pid);
    return p ? p.nom : 'Inconnu';
  });
}

export function formatMoney(amount: number): string {
  return new Intl.NumberFormat('fr-FR').format(amount) + ' FC';
}

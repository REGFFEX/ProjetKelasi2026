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
    adresse: 'Av. de la Victoire, Brazzaville',
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
  password: 'Admin@2026',
  telephone: '+243 81 234 5678',
  role: 'school_admin',
  statut: 'actif',
};

export const users: User[] = [
  currentUser,
  { id: 'u2', schoolId: 's1', nom: 'Marie Kalala', email: 'marie.kalala@kelasi.com', password: 'Secret@2026', telephone: '+243 81 111 2222', role: 'secretary', statut: 'actif' },
  { id: 'u3', schoolId: 's1', nom: 'Pierre Mbuyi', email: 'pierre.mbuyi@kelasi.com', password: 'Compta@2026', telephone: '+243 81 333 4444', role: 'accountant', statut: 'actif' },
  { id: 'u4', schoolId: 's1', nom: 'Esther Tshala', email: 'esther.tshala@kelasi.com', password: 'Prof@2026', telephone: '+243 81 555 6666', role: 'teacher', statut: 'actif' },
  { id: 'u5', schoolId: 's1', nom: 'Jean Mukendi', email: 'jean.mukendi@kelasi.com', password: 'Parent@2026', telephone: '+243 81 777 8888', role: 'parent', statut: 'actif' },
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
  { id: 'sub8', schoolId: 's1', nom: 'Religion', coefficient: 1 },
  { id: 'sub9', schoolId: 's1', nom: 'Éducation artistique', coefficient: 1 },
];

export const classrooms: Classroom[] = [
  { id: 'c1', schoolId: 's1', niveau: '6ème', nom: '6ème A', salle: 'Salle 101', enseignantPrincipalId: 't1', studentIds: Array.from({length:12},(_,i)=>`st${i+1}`) },
  { id: 'c2', schoolId: 's1', niveau: '5ème', nom: '5ème A', salle: 'Salle 102', enseignantPrincipalId: 't2', studentIds: Array.from({length:10},(_,i)=>`st${i+13}`) },
  { id: 'c3', schoolId: 's1', niveau: '4ème', nom: '4ème A', salle: 'Salle 201', enseignantPrincipalId: 't1', studentIds: Array.from({length:10},(_,i)=>`st${i+23}`) },
  { id: 'c4', schoolId: 's1', niveau: '3ème', nom: '3ème A', salle: 'Salle 202', enseignantPrincipalId: 't3', studentIds: Array.from({length:8},(_,i)=>`st${i+33}`) },
  { id: 'c5', schoolId: 's1', niveau: '6ème', nom: '6ème B', salle: 'Salle 103', enseignantPrincipalId: 't2', studentIds: Array.from({length:10},(_,i)=>`st${i+41}`) },
];

export const teachers: Teacher[] = [
  { id: 't1', schoolId: 's1', userId: 'u4', nom: 'Tshala', prenom: 'Esther', email: 'esther.tshala@kelasi.com', telephone: '+243 81 555 6666', matiereIds: ['sub1','sub4'], classroomIds: ['c1','c3'], statut: 'actif' },
  { id: 't2', schoolId: 's1', userId: 'u6', nom: 'Mpeza', prenom: 'David', email: 'david.mpeza@kelasi.com', telephone: '+243 81 999 1010', matiereIds: ['sub2','sub5'], classroomIds: ['c2','c5'], statut: 'actif' },
  { id: 't3', schoolId: 's1', userId: 'u7', nom: 'Nkulu', prenom: 'Sarah', email: 'sarah.nkulu@kelasi.com', telephone: '+243 82 121 3141', matiereIds: ['sub3'], classroomIds: ['c4'], statut: 'actif' },
  { id: 't4', schoolId: 's1', userId: 'u8', nom: 'Bakwa', prenom: 'Michel', email: 'michel.bakwa@kelasi.com', telephone: '+243 82 343 5454', matiereIds: ['sub7','sub6'], classroomIds: ['c1','c2','c3'], statut: 'actif' },
  { id: 't5', schoolId: 's1', userId: 'u9', nom: 'Mbuyi', prenom: 'Jeanne', email: 'jeanne.mbuyi@kelasi.com', telephone: '+243 81 565 6767', matiereIds: ['sub8','sub9'], classroomIds: ['c4','c5'], statut: 'actif' },
];

const firstNames = [
  'Aimé','Béatrice','Christian','Divine','Emmanuel','Fanny','Gloire','Hélène','Iris','Joël',
  'Kévin','Larissa','Marc','Nadège','Olivier','Prisca','Quentin','Rachel','Steve','Thérèse',
  'Ulrich','Viviane','Wilson','Yannick','Zoé','Ange','Bénédicte','Cédric','Diane','Espérance',
  'Fabrice','Grâce','Hervé','Inès','Josué','Karine','Léon','Mireille','Norbert','Olive',
  'Pascal','Queen','Rudy','Sylvie','Thierry','Ursule','Venance','William','Yolande','Zaire',
];
const lastNames = [
  'Mukendi','Kabongo','Mwamba','Ntumba','Ilunga','Kasongo','Mwenze','Tshibangu','Lukusa','Mbiya',
  'Bofando','Mukeba','Kasawu','Bakwa','Nkulu','Mpeza','Tshala','Mbuyi','Kalala','Kabasele',
  'Mwamba','Kibonge','Tshisekedi','Kabila','Lumumba','Mobutu','Kasa-Vubu','Bemba','Katumbi','Madiba',
  'Ngalula','Bashila','Kabange','Mukwege','Tshombe','Sendwe','Mulele','Kengo','Nzuzi','Bola',
  'Delva','Mafuta','Kabongo','Lukusa','Mabiala','Tumba','Kabasele','Mwila','Kasongo','Nkashama',
];

export const students: Student[] = Array.from({ length: 50 }, (_, i) => {
  const id = `st${i + 1}`;
  let classroomId = 'c1';
  if (i >= 12) classroomId = 'c2';
  if (i >= 22) classroomId = 'c3';
  if (i >= 32) classroomId = 'c4';
  if (i >= 40) classroomId = 'c5';
  const parentAssignments: Record<string, string[]> = {};
  for (let j = 0; j < 50; j++) {
    parentAssignments[`st${j+1}`] = [`p${(j % 15) + 1}`];
    if (j % 5 === 0) parentAssignments[`st${j+1}`].push(`p${((j + 3) % 15) + 1}`);
  }
  return {
    id,
    schoolId: 's1',
    matricule: `EL${String(i + 1).padStart(4, '0')}`,
    nom: lastNames[i % lastNames.length],
    prenom: firstNames[i % firstNames.length],
    dateNaissance: `201${Math.floor(i / 12)}-0${(i % 9) + 1}-1${i % 9}`,
    classroomId,
    statut: i % 30 === 29 ? 'inactif' : 'actif',
    parentIds: parentAssignments[id] || [],
    documents: [
      { id: `doc${i}-1`, nom: 'Acte de naissance', type: 'PDF', dateAjout: '2026-09-01' },
      { id: `doc${i}-2`, nom: 'Bulletin précédent', type: 'PDF', dateAjout: '2026-09-01' },
      { id: `doc${i}-3`, nom: 'Photo d\'identité', type: 'JPG', dateAjout: '2026-09-01' },
    ],
  };
});

export const parents: Parent[] = Array.from({ length: 15 }, (_, i) => {
  const id = `p${i + 1}`;
  const childIndices: number[] = [];
  for (let j = 0; j < 50; j++) {
    if (j % 15 === i) childIndices.push(j);
    if (j % 5 === 0 && (j + 3) % 15 === i) childIndices.push(j);
  }
  const professions = ['Commerçant','Infirmière','Chauffeur','Enseignante','Mécanicien','Secrétaire','Avocat','Coiffeuse','Comptable','Vendeuse','Électricien','Médecin','Architecte','Commerçante','Fonctionnaire'];
  const quartiers = ['Matonge','Lemba','Bandalungwa','Ngaliema','Kintambo','Gombe','Ngaba','Selembao','Bandal','Lemba','Matonge','Ngaliema','Bandalungwa','Kintambo','Gombe'];
  const noms = ['Jean Mukendi','Adèle Kabongo','Félix Mwamba','Claire Ntumba','Patrick Ilunga','Brigitte Kasongo','Augustin Mwenze','Solange Tshibangu','Robert Lukusa','Nadine Mbiya','Éric Bofando','Grace Mukeba','Daniel Kasawu','Marie Bakwa','Paul Nkulu'];
  return {
    id,
    schoolId: 's1',
    nom: noms[i],
    telephone: `+243 8${i % 2} ${String(100 + i * 11).slice(0,3)} ${String(200 + i * 22).slice(0,4)}`,
    email: `${noms[i].toLowerCase().replace(/ /g, '.')}@gmail.com`,
    adresse: `Quartier ${quartiers[i]}, Kinshasa`,
    profession: professions[i],
    studentIds: childIndices.map(j => `st${j+1}`),
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
  { id: 'a7', schoolId: 's1', subjectId: 'sub3', classroomId: 'c3', termId: 't1', libelle: 'Contrôle - Colonisation', date: '2026-10-07', coefficient: 2 },
  { id: 'a8', schoolId: 's1', subjectId: 'sub1', classroomId: 'c3', termId: 't1', libelle: 'Devoir 1 - Algèbre', date: '2026-10-09', coefficient: 2 },
  { id: 'a9', schoolId: 's1', subjectId: 'sub4', classroomId: 'c4', termId: 't1', libelle: 'Examen - Chimie', date: '2026-10-11', coefficient: 3 },
  { id: 'a10', schoolId: 's1', subjectId: 'sub2', classroomId: 'c4', termId: 't1', libelle: 'Dissertation - Démocratie', date: '2026-10-13', coefficient: 2 },
  { id: 'a11', schoolId: 's1', subjectId: 'sub7', classroomId: 'c5', termId: 't1', libelle: 'TP - Word Processing', date: '2026-10-14', coefficient: 1 },
  { id: 'a12', schoolId: 's1', subjectId: 'sub1', classroomId: 'c5', termId: 't1', libelle: 'Devoir 1 - Nombres décimaux', date: '2026-10-16', coefficient: 2 },
];

export const grades: Grade[] = assessments.flatMap((a, ai) => {
  const classStudents = students.filter(s => s.classroomId === a.classroomId);
  return classStudents.map((s, si) => ({
    id: `g${a.id}-${s.id}`,
    schoolId: 's1',
    assessmentId: a.id,
    studentId: s.id,
    note: Math.round((8 + ((si * 3 + ai * 2) % 12)) * 2) / 2,
    statutValidation: ai < 4 ? 'publie' : ai < 8 ? 'valide' : 'brouillon',
  }));
});

export const invoices: Invoice[] = students.map((s, i) => {
  const montantTotal = 250000 + (i % 4) * 50000;
  const montantPaye = i % 5 === 0 ? montantTotal : i % 3 === 0 ? Math.floor(montantTotal * 0.5) : i % 4 === 0 ? 100000 : 0;
  const reste = montantTotal - montantPaye;
  const types: Invoice['typeFrais'][] = ['scolarite','inscription','cantine','transport','autre'];
  return {
    id: `inv${i}`,
    schoolId: 's1',
    studentId: s.id,
    typeFrais: types[i % types.length],
    montantTotal,
    montantPaye,
    resteAPayer: reste,
    dateEmission: `2026-09-0${(i % 9) + 1}`,
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
    modePaiement: i % 4 === 0 ? 'especes' : i % 4 === 1 ? 'mobile_money' : i % 4 === 2 ? 'virement' : 'cheque',
    partiel: inv.statut === 'partiel',
  }));

export const notifications: Notification[] = [
  { id: 'n1', schoolId: 's1', type: 'paiement', destinataireId: 'p1', canal: 'sms', message: 'Paiement de 250.000 FC reçu pour Aimé Mukendi. Merci!', statut: 'envoye', date: '2026-10-15T08:30:00' },
  { id: 'n2', schoolId: 's1', type: 'absence', destinataireId: 'p2', canal: 'sms', message: 'Votre enfant Béatrice Kabongo était absent(e) aujourd\'hui. Veuillez justifier.', statut: 'envoye', date: '2026-10-15T09:00:00' },
  { id: 'n3', schoolId: 's1', type: 'annonce', destinataireId: 'all', canal: 'in-app', message: 'Réunion parents-professeurs le 25 octobre à 10h.', statut: 'envoye', date: '2026-10-14T14:00:00' },
  { id: 'n4', schoolId: 's1', type: 'bulletin', destinataireId: 'p1', canal: 'email', message: 'Le bulletin du Trimestre 1 de Aimé Mukendi est disponible.', statut: 'en_attente', date: '2026-10-15T10:00:00' },
  { id: 'n5', schoolId: 's1', type: 'nouvel_eleve', destinataireId: 'u1', canal: 'in-app', message: 'Nouvel élève inscrit: Christian Mwamba (6ème A).', statut: 'envoye', date: '2026-10-13T11:00:00' },
  { id: 'n6', schoolId: 's1', type: 'paiement', destinataireId: 'p3', canal: 'sms', message: 'Rappel: frais de scolarité en attente de paiement.', statut: 'echec', date: '2026-10-15T07:00:00' },
  { id: 'n7', schoolId: 's1', type: 'absence', destinataireId: 'p5', canal: 'sms', message: 'Votre enfant Gloire Mwenze était en retard aujourd\'hui.', statut: 'envoye', date: '2026-10-15T09:15:00' },
  { id: 'n8', schoolId: 's1', type: 'annonce', destinataireId: 'all', canal: 'in-app', message: 'Les bulletins du 1er trimestre seront disponibles le 18 décembre.', statut: 'envoye', date: '2026-10-13T16:00:00' },
  { id: 'n9', schoolId: 's1', type: 'paiement', destinataireId: 'p7', canal: 'email', message: 'Reçu de paiement disponible pour téléchargement.', statut: 'envoye', date: '2026-10-14T11:00:00' },
  { id: 'n10', schoolId: 's1', type: 'nouvel_eleve', destinataireId: 'u1', canal: 'in-app', message: 'Nouvel élève inscrit: Divine Ntumba (5ème A).', statut: 'envoye', date: '2026-10-12T08:00:00' },
];

export const announcements: Announcement[] = [
  { id: 'an1', schoolId: 's1', auteurId: 'u1', auteurNom: 'Joseph Kabasele', cible: 'tous', titre: 'Réunion parents-professeurs', contenu: 'La réunion parents-professeurs se tiendra le 25 octobre 2026 à 10h dans la grande salle. La présence d\'au moins un parent par élève est obligatoire.', datePublication: '2026-10-14T14:00:00' },
  { id: 'an2', schoolId: 's1', auteurId: 'u1', auteurNom: 'Joseph Kabasele', cible: 'parents', titre: 'Paiement des frais du 2ème trimestre', contenu: 'Nous rappelons aux parents que les frais du 2ème trimestre doivent être payés avant le 5 janvier 2027. Merci de votre compréhension.', datePublication: '2026-10-12T09:00:00' },
  { id: 'an3', schoolId: 's1', auteurId: 'u4', auteurNom: 'Esther Tshala', cible: 'classe', titre: 'Sortie pédagogique 6ème A', contenu: 'Une sortie pédagogique est prévue pour la classe de 6ème A le 20 octobre au Parc de la Vallée. Contribution: 5.000 FC par élève.', datePublication: '2026-10-10T16:00:00' },
  { id: 'an4', schoolId: 's1', auteurId: 'u1', auteurNom: 'Joseph Kabasele', cible: 'enseignants', titre: 'Conseil de classe', contenu: 'Le conseil de classe du 1er trimestre se tiendra le 18 décembre à 14h. Préparez vos appréciations.', datePublication: '2026-10-08T10:00:00' },
  { id: 'an5', schoolId: 's1', auteurId: 'u2', auteurNom: 'Marie Kalala', cible: 'tous', titre: 'Vacances de la Toussaint', contenu: 'L\'école sera fermée du 28 octobre au 3 novembre 2026 pour les vacances de la Toussaint. Les cours reprennent le 4 novembre.', datePublication: '2026-10-11T15:00:00' },
  { id: 'an6', schoolId: 's1', auteurId: 'u4', auteurNom: 'Esther Tshala', cible: 'classe', titre: 'Devoir de rattrapage', contenu: 'Un devoir de rattrapage en mathématiques aura lieu le 22 octobre pour les élèves ayant raté le Devoir 1.', datePublication: '2026-10-09T12:00:00' },
];

export const dashboardStats: DashboardStats = {
  effectifTotal: 50,
  presentsAujourdhui: 40,
  absentsAujourdhui: 4,
  retardsAujourdhui: 4,
  justifiesAujourdhui: 2,
  paiementsDuJour: 350000,
  impayesTotal: 1850000,
  nouveauxElevesMois: 8,
  recettesMensuelles: 6400000,
  recettesParMois: [
    { mois: 'Sep', montant: 5600000 },
    { mois: 'Oct', montant: 6400000 },
    { mois: 'Nov', montant: 4200000 },
    { mois: 'Déc', montant: 3600000 },
    { mois: 'Jan', montant: 4800000 },
    { mois: 'Fév', montant: 3900000 },
  ],
  presencesParClasse: [
    { classe: '6ème A', present: 10, absent: 1, retard: 1, justifie: 0 },
    { classe: '5ème A', present: 8, absent: 1, retard: 1, justifie: 0 },
    { classe: '4ème A', present: 8, absent: 1, retard: 0, justifie: 1 },
    { classe: '3ème A', present: 6, absent: 0, retard: 1, justifie: 1 },
    { classe: '6ème B', present: 8, absent: 1, retard: 1, justifie: 0 },
  ],
  repartitionEffectif: [
    { niveau: '6ème', effectif: 22 },
    { niveau: '5ème', effectif: 10 },
    { niveau: '4ème', effectif: 10 },
    { niveau: '3ème', effectif: 8 },
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

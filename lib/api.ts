import { supabase } from './supabase';

// Database row types (snake_case from Postgres)
interface DbSchool {
  id: string;
  nom: string;
  logo: string | null;
  adresse: string;
  telephone: string;
  statut_abonnement: string;
  date_creation: string;
}

interface DbStudent {
  id: string;
  school_id: string;
  matricule: string;
  nom: string;
  prenom: string;
  date_naissance: string;
  photo: string | null;
  classroom_id: string | null;
  statut: string;
}

interface DbParent {
  id: string;
  school_id: string;
  nom: string;
  telephone: string;
  email: string | null;
  adresse: string;
  profession: string;
}

interface DbTeacher {
  id: string;
  school_id: string;
  user_id: string | null;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  matiere_ids: string[];
  classroom_ids: string[];
  statut: string;
}

interface DbClassroom {
  id: string;
  school_id: string;
  niveau: string;
  nom: string;
  salle: string;
  enseignant_principal_id: string | null;
}

interface DbSubject {
  id: string;
  school_id: string;
  nom: string;
  coefficient: number;
}

interface DbAttendance {
  id: string;
  school_id: string;
  student_id: string;
  classroom_id: string | null;
  date: string;
  statut: string;
}

interface DbAssessment {
  id: string;
  school_id: string;
  subject_id: string;
  classroom_id: string;
  term_id: string;
  libelle: string;
  date: string;
  coefficient: number;
}

interface DbGrade {
  id: string;
  school_id: string;
  assessment_id: string;
  student_id: string;
  note: number;
  statut_validation: string;
}

interface DbInvoice {
  id: string;
  school_id: string;
  student_id: string;
  type_frais: string;
  montant_total: number;
  montant_paye: number;
  reste_a_payer: number;
  date_emission: string;
  statut: string;
}

interface DbPayment {
  id: string;
  school_id: string;
  invoice_id: string;
  montant: number;
  date_paiement: string;
  mode_paiement: string;
  partiel: boolean;
}

interface DbNotification {
  id: string;
  school_id: string;
  type: string;
  destinataire_id: string;
  canal: string;
  message: string;
  statut: string;
  date: string;
}

interface DbAnnouncement {
  id: string;
  school_id: string;
  auteur_id: string | null;
  auteur_nom: string;
  cible: string;
  titre: string;
  contenu: string;
  date_publication: string;
}

interface DbAcademicYear {
  id: string;
  school_id: string;
  libelle: string;
  date_debut: string;
  date_fin: string;
  statut: string;
}

interface DbStudentParent {
  id: string;
  school_id: string;
  student_id: string;
  parent_id: string;
}

// ── Fetch functions ──────────────────────────────────────────

export async function fetchSchools() {
  const { data, error } = await supabase.from('schools').select('*');
  if (error) throw error;
  return data as DbSchool[];
}

export async function fetchStudents() {
  const { data, error } = await supabase.from('students').select('*').order('nom');
  if (error) throw error;
  return data as DbStudent[];
}

export async function fetchStudentById(id: string) {
  const { data, error } = await supabase.from('students').select('*').eq('id', id).maybeSingle();
  if (error) throw error;
  return data as DbStudent | null;
}

export async function fetchStudentParents(studentId: string) {
  const { data, error } = await supabase
    .from('student_parents')
    .select('parent_id')
    .eq('student_id', studentId);
  if (error) throw error;
  const parentIds = (data as DbStudentParent[]).map(sp => sp.parent_id);
  if (parentIds.length === 0) return [];
  const { data: parents, error: pErr } = await supabase
    .from('parents')
    .select('*')
    .in('id', parentIds);
  if (pErr) throw pErr;
  return parents as DbParent[];
}

export async function fetchStudentDocuments(studentId: string) {
  const { data, error } = await supabase
    .from('student_documents')
    .select('*')
    .eq('student_id', studentId);
  if (error) throw error;
  return data;
}

export async function fetchParents() {
  const { data, error } = await supabase.from('parents').select('*').order('nom');
  if (error) throw error;
  return data as DbParent[];
}

export async function fetchTeachers() {
  const { data, error } = await supabase.from('teachers').select('*').order('nom');
  if (error) throw error;
  return data as DbTeacher[];
}

export async function fetchClassrooms() {
  const { data, error } = await supabase.from('classrooms').select('*').order('nom');
  if (error) throw error;
  return data as DbClassroom[];
}

export async function fetchSubjects() {
  const { data, error } = await supabase.from('subjects').select('*').order('nom');
  if (error) throw error;
  return data as DbSubject[];
}

export async function fetchAttendance() {
  const { data, error } = await supabase.from('attendance').select('*').order('date', { ascending: false });
  if (error) throw error;
  return data as DbAttendance[];
}

export async function fetchAssessments() {
  const { data, error } = await supabase.from('assessments').select('*').order('date', { ascending: false });
  if (error) throw error;
  return data as DbAssessment[];
}

export async function fetchGrades() {
  const { data, error } = await supabase.from('grades').select('*');
  if (error) throw error;
  return data as DbGrade[];
}

export async function fetchInvoices() {
  const { data, error } = await supabase.from('invoices').select('*').order('date_emission', { ascending: false });
  if (error) throw error;
  return data as DbInvoice[];
}

export async function fetchPayments() {
  const { data, error } = await supabase.from('payments').select('*').order('date_paiement', { ascending: false });
  if (error) throw error;
  return data as DbPayment[];
}

export async function fetchNotifications() {
  const { data, error } = await supabase.from('notifications').select('*').order('date', { ascending: false });
  if (error) throw error;
  return data as DbNotification[];
}

export async function fetchAnnouncements() {
  const { data, error } = await supabase.from('announcements').select('*').order('date_publication', { ascending: false });
  if (error) throw error;
  return data as DbAnnouncement[];
}

export async function fetchAcademicYears() {
  const { data, error } = await supabase.from('academic_years').select('*').order('date_debut', { ascending: false });
  if (error) throw error;
  return data as DbAcademicYear[];
}

export async function fetchAllStudentParents() {
  const { data, error } = await supabase.from('student_parents').select('*');
  if (error) throw error;
  return data as { id: string; school_id: string; student_id: string; parent_id: string }[];
}

export async function fetchUsers() {
  const { data, error } = await supabase.from('users').select('*').order('nom');
  if (error) throw error;
  return data;
}

// ── Mutations ─────────────────────────────────────────────────

export async function createStudent(student: {
  school_id: string;
  matricule: string;
  nom: string;
  prenom: string;
  date_naissance: string;
  classroom_id: string;
  statut: string;
}) {
  const { data, error } = await supabase.from('students').insert(student).select().single();
  if (error) throw error;
  return data;
}

export async function updateStudent(id: string, updates: Record<string, unknown>) {
  const { data, error } = await supabase.from('students').update(updates).eq('id', id).select().single();
  if (error) throw error;
  return data;
}

export async function deleteStudent(id: string) {
  const { error } = await supabase.from('students').delete().eq('id', id);
  if (error) throw error;
}

export async function createPayment(payment: {
  school_id: string;
  invoice_id: string;
  montant: number;
  mode_paiement: string;
  partiel: boolean;
}) {
  const { data, error } = await supabase.from('payments').insert(payment).select().single();
  if (error) throw error;
  return data;
}

export async function createAnnouncement(announcement: {
  school_id: string;
  auteur_id: string;
  auteur_nom: string;
  cible: string;
  titre: string;
  contenu: string;
}) {
  const { data, error } = await supabase.from('announcements').insert(announcement).select().single();
  if (error) throw error;
  return data;
}

export async function upsertAttendance(records: {
  school_id: string;
  student_id: string;
  classroom_id: string;
  date: string;
  statut: string;
}[]) {
  const { data, error } = await supabase.from('attendance').upsert(records, { onConflict: 'student_id,date' }).select();
  if (error) throw error;
  return data;
}

export async function upsertGrades(records: {
  school_id: string;
  assessment_id: string;
  student_id: string;
  note: number;
  statut_validation: string;
}[]) {
  const { data, error } = await supabase.from('grades').upsert(records, { onConflict: 'assessment_id,student_id' }).select();
  if (error) throw error;
  return data;
}

// ── Helpers ───────────────────────────────────────────────────

export function formatMoney(amount: number): string {
  return new Intl.NumberFormat('fr-FR').format(amount) + ' FC';
}

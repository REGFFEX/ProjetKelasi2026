'use client';

import { AppShell } from '@/components/app-shell';
import { StudentFormContent } from '@/components/student-form-content';
import { students } from '@/lib/mock-data';
import { notFound } from 'next/navigation';

export default function EditStudentPage({ params }: { params: { id: string } }) {
  const student = students.find(s => s.id === params.id);
  if (!student) notFound();

  return (
    <AppShell>
      <StudentFormContent mode="edit" studentId={params.id} />
    </AppShell>
  );
}

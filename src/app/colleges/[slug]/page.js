import { notFound } from 'next/navigation';

import CollegeDetail from '@/components/colleges/CollegeDetail/CollegeDetail';
import { colleges, getCollegeBySlug } from '@/data/colleges';

export function generateStaticParams() {
  return colleges.map((college) => ({ slug: college.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const college = getCollegeBySlug(slug);
  if (!college) {
    return { title: 'College not found' };
  }

  const description = college.research?.overview || college.shortDescription;

  return {
    title: college.name,
    description,
    openGraph: {
      title: `${college.name} | Edu Study Consultancy`,
      description,
    },
  };
}

export default async function CollegeDetailPage({ params }) {
  const { slug } = await params;
  const college = getCollegeBySlug(slug);
  if (!college) notFound();

  return <CollegeDetail college={college} />;
}

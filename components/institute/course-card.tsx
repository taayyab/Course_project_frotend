// src/components/institute/course-card.tsx
import Image from "next/image";

export function CourseCard({ course }: { course: any }) {
  return (
    <div className="border rounded-lg shadow-sm overflow-hidden">
      <Image
        src={course.coverImage}
        alt={course.title}
        width={400}
        height={200}
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <h2 className="font-semibold text-lg">{course.title}</h2>
        <p className="text-sm text-gray-600">{course.instructor}</p>
        <p className="text-sm text-gray-500">{course.duration}</p>
        <p className="font-bold mt-2">${course.price}</p>
      </div>
    </div>
  );
}

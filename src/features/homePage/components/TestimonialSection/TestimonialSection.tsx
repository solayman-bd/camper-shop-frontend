import SectionsWraper from "../../../../components/SectionsWraper";
import TestimonialCard from "./TestimonialCard";
import { testimonials } from "./TestimonialData";

const TestimonialsSection: React.FC = () => {
  return (
    <SectionsWraper heading="Testimonial">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </SectionsWraper>
  );
};

export default TestimonialsSection;

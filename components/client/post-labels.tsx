import LabelType from "@/interfaces/label";
import { Badge } from "@/components/ui/badge";


type Props = {
    labels: LabelType[];
  };
  
  const PostLabels = ({ labels }: Props) => {
    return (
        <div className="flex flex-row mt-2">
            {
            labels.map((label) => (
              <Badge key={label.name} className={`bg-[#9aae8e] hover:bg-[#9aae8e] text-white hover:text-white dark:bg-[#818CF8] dark:hover:bg-[#818CF8] dark:text-white dark:hover:text-white font-light w-fit rounded-full mr-2`}>
                {label.name}
              </Badge>
            ))
            }
        </div> 
    );
  };
  
  export default PostLabels;
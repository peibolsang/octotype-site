import LabelType from "@/interfaces/label";
import { Badge } from "@/components/ui/badge";
import { LABEL } from "@/lib/constants";


type Props = {
    labels: LabelType[];
  };
  
  const PostLabels = ({ labels }: Props) => {
    return (
        <div className="flex flex-row mt-2">
            {
            labels
            .filter(label=>label.name!=LABEL)
            .map((label) => (
              <Badge key={label.name} className={`text-[0.8rem] bg-[#9aae8e] hover:bg-[#9aae8e] text-white hover:text-white dark:bg-[#818CF8] dark:hover:bg-[#818CF8] dark:text-white dark:hover:text-white font-light w-fit rounded-full mr-2`}>
                {label.name}
              </Badge>
            ))
            }
        </div> 
    );
  };
  
  export default PostLabels;
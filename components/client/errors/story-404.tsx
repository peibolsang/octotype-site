import Container from "@/components/ui/container";

interface UserErrorProps {
    user: string;
  }

export const Story404: React.FC<UserErrorProps> = ({user}) => {
    return(
      <div className="bg-[#f4f1ea] bg-opacity-70 dark:bg-slate-900">
        <Container compact>
          <div className="flex flex-col py-[48px] gap-[24px]">
          Looks like you're lost. We couldn't find this {user}'s story.
        </div>
      </Container>
    </div>)
  }
  
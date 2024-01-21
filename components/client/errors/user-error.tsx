import { hasRepo} from "@/lib/api";
import Container from "@/components/ui/container";
import { HowItWorks } from "@/components/client/how-it-works";
import Section from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";

interface UserErrorProps {
    user: string;
  }
  
export const UserError: React.FC<UserErrorProps> = async ({ user}) => {
    const hasRepoFlag = await hasRepo(user)
    return (
      <section className="bg-[#f4f1ea] bg-opacity-70 dark:bg-slate-900 py-[16px] xl:py-[32px]">
        <Container>
          <Section>
            {
              hasRepoFlag?
                <Badge variant="outline" className="inline-flex items-center gap-2 w-fit py-1 px-2 bg-slate-200 dark:bg-slate-700 rounded-xl text-[0.875rem] font-medium font-mono border-none mb-4">
                  We couldn't find stories for this user
                </Badge>
              :
                <Badge variant="outline" className="bg-red-200 text-red-500 dark:bg-red-500 dark:text-white inline-flex items-center gap-2 w-fit py-1 px-2 rounded-xl text-[0.875rem] font-medium font-mono border-none mb-4">
                  User not initialized yet
                </Badge>
            }
            <div className="flex flex-col lg:flex-row w-full">
              <HowItWorks username={user} showUserProgress={hasRepoFlag}/>
            </div>
          </Section>
        </Container>
      </section>
    )
}
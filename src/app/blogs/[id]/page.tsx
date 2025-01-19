import { TableOfContents } from "@/components/pages/blogs/TableOfContents";
import { LikeOutlined, UserOutlined } from "@ant-design/icons";
import {
  Anchor,
  Avatar,
  Badge,
  Button,
  Divider,
  Flex,
  List,
  Statistic,
  Tag,
  Typography,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import Title from "antd/es/typography/Title";
const { Link } = Anchor;

interface PageProps {
  params: {
    id: string; // Define the expected route parameter
  };
}
const mockPost = {
  title:
    "Leader Spotlight: Learning how to have hard conversations, with Mahesh Guruswamy",
  content: `<p><span style="color: #000000">Mahesh Guruswamy is Chief Product and Technology Officer at Kickstarter, a global crowdfunding platform focused on creativity. He started his career as a software engineer at Vanguard before transitioning to Fidelity Investments, where he became Director of Architecture. Mahesh then worked at Homesite Insurance and Houghton Mifflin Harcourt before managing Amazon Alexa’s software development teams. Before his current role at Kickstarter, he held leadership positions at Smartsheet, Kajabi.</span><br>The importance of transparency</p><h1  id="theimportanceoftransparency">The importance of transparency</h1><p ><span style="font-family: &quot;Crimson Text&quot;, serif; color: rgb(49, 51, 55); font-size: 20px">It really depends on the situation. That’s one of the reasons why I wrote the book — you can’t use the same playbook for every situation. There are times when you deliver bad news to stakeholders, customers, your boss, peers, or your team. There are nuances in each case that you need to be aware of, but the one common thing across all of these is transparency. In the end, everybody wants to know what’s going on. The commonality is that people are looking for transparency.</span></p><h1  id="speakingouttothepublic">Speaking out to the public</h1><p >It’s interesting because many companies, and specifically PR departments, often advise against jumping into a public forum and talking about what’s actually going on. I’m completely on the other side of it. I don’t ignore the PR department’s recommendations, but I’m very comfortable going out in public and talking things through.In that public Facebook post, I wrote, “Every two hours I’ll give you an update. And if I’m sleeping, somebody else on my team will give you an update until this issue is solved.” I wanted to provide that level of response, because I understood this issue was causing a huge problem for our customers.</p><h1  id="thecorrectionoferrorsprocess">The correction of errors process</h1><p >Back at Amazon, we used a process called correction of errors (COE). We used it more in the context of system issues, but a similar process can be applied to any tough situation. For example, if your project got delayed, if you found out that the hire you made didn’t work out, or if you have to tell your team that you’re going back on the word that you gave them. I don’t ask my team to go through a COE on all issues, but definitely for operational ones. People also call these root cause analyses or postmortems.</p><p >Specifically, I like to dig into what we would do if we had to cut down the time it took for us to detect the issue. I also like doing the Even in business situations, I find that really helpful. It’s also important to do these things when the situation is fresh in your mind and not a lot of time has passed. It’s a good way to frame your thought process on what you could do better in the future.</p>`,
};
// get all h1 string
const h1Regex = /<h1[^>]*>(.*?)<\/h1>/g;
const h1Texts = [];
let match;
while ((match = h1Regex.exec(mockPost.content)) !== null) {
  h1Texts.push(match[1].trim());
}
// end get all h1 string

const data = h1Texts;
const Text = Typography.Text;
const Page: React.FC<PageProps> = ({ params }) => {
  const { id } = params;

  return (
    <div className="p-4">
      <div className="bg-[#4587e5] flex w-full mx-auto h-96 text-left bg-cover bg-no-repeat bg-right justify-center items-center">
        <h1 className="text-4xl font-bold">{mockPost.title}</h1>
      </div>
      <div className="flex">
        <div className="left-content-container w-96">
          <TableOfContents data={data} />
        </div>
        <div className="right-content-container aie-container [&_img]:inline-block flex-1 flex flex-col gap-4 pb-10">
          <div className="aie-content">
            <div dangerouslySetInnerHTML={{ __html: mockPost.content }} />
          </div>
          <div className="flex flex-col gap-4 px-4">
            <Flex gap="4px 0">
              <Tag color="processing" className="!p-1">
                Technology
              </Tag>
              <Tag color="processing" className="!p-1">
                Health and Wellness
              </Tag>
              <Tag color="processing" className="!p-1">
                Travel
              </Tag>
              <Tag color="processing" className="!p-1">
                Finance
              </Tag>
              <Tag color="processing" className="!p-1">
                Education
              </Tag>
            </Flex>
            <Statistic
              value={1128}
              prefix={
                <Button type="default" shape="circle" icon={<LikeOutlined />} />
              }
            />
            <div className="comment-section flex flex-col gap-4">
              <Badge count={5}>
                <Title className="!p-0" level={2}>
                  Comments
                </Title>
              </Badge>

              <TextArea
                variant="outlined"
                placeholder="Leave a comment"
                rows={4}
              />
              <Flex justify="space-between">
                <div></div>
                <Button type="primary">Post comment</Button>
              </Flex>
              <div className="comment-section-details flex flex-col gap-4">
                <Flex className="gap-2">
                  <Avatar
                    size={48}
                    src="https://assets.minimals.cc/public/assets/images/mock/avatar/avatar-25.webp"
                  />
                  <Flex vertical>
                    <Flex vertical justify="space-evenly" className="h-12">
                      <p className="font-bold">Jayvion Simon</p>
                      <p className="text-gray-700">18 Jan 2025</p>
                    </Flex>
                    <p className="mt-1">
                      She eagerly opened the gift, her eyes sparkling with
                      excitement.
                      <br />
                      The old oak tree stood tall and majestic, its branches
                      swaying gently in the breeze.
                    </p>
                  </Flex>
                </Flex>
                <Divider />
                <Flex className="gap-2">
                  <Avatar
                    size={48}
                    src="https://assets.minimals.cc/public/assets/images/mock/avatar/avatar-25.webp"
                  />
                  <Flex vertical>
                    <Flex vertical justify="space-evenly" className="h-12">
                      <p className="font-bold">Jayvion Simon</p>
                      <p className="text-gray-700">18 Jan 2025</p>
                    </Flex>
                    <p className="mt-1">
                      She eagerly opened the gift, her eyes sparkling with
                      excitement.
                      <br />
                      The old oak tree stood tall and majestic, its branches
                      swaying gently in the breeze.
                    </p>
                  </Flex>
                </Flex>
                <Divider />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Page;

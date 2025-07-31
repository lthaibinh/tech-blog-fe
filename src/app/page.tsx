// File: app/page.tsx
import {AuthorList} from "@/components/pages/blogs/AuthorList";
import {BlogItemRow} from "@/components/pages/blogs/BlogItemRow";
import {getAllBlogPost} from "@/services/blogServies";
import {getAllUser} from "@/services/commonServices";
import {IUserProfile} from "@/types";
import {IBlogResponse} from "@/types/api";
import {Col, Divider, Row} from "antd";
import {lastValueFrom} from "rxjs";

export default async function Home() {
	let blogs: IBlogResponse[] = [];
	let authorList: IUserProfile[] = [];
	try {
		blogs = await lastValueFrom(getAllBlogPost()); // Convert RxJS observable to promise
		authorList = await lastValueFrom(getAllUser());
	} catch (error) {
		console.error("Error fetching blogs:", error);
	}
	return (
		<div className="main-page max-w-[1200px] w-full mx-auto flex pt-4">

			<div className="w-full p-4 min-h-screen">
				<Row gutter={[32, 32]}>
					{blogs.map((item) => (
						<Col span={12} key={item.id}>
							<BlogItemRow {...item} />
							<Divider/>
						</Col>
					))}
				</Row>
			</div>
			<div className="left-content-container w-96">
				<AuthorList data={authorList}/>
			</div>
		</div>
	);
}

export interface Project {
	name: string;
	description: string;
	owner_id: string;
	Image: string;
	git_repo: string;
	url: string;
}
export interface Projects {
	Projects: [Project];
}

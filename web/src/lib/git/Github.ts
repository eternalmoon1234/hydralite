interface User {
	login: string;
	id: number;
	avatarUrl: string;
}
export class Github {
	AccessToken: string;
	RefreshToken: string;
	User: Promise<User>;
	constructor(accessToken, refreshToken) {
		this.AccessToken = accessToken;
		this.RefreshToken = refreshToken;
		this.User = this.getUser();
	}
	public getReposFromOrg(org: string) {
		return this.User.then((val) => {
			if (org === val.login) {
				return fetch(`https://api.github.com/users/${org}/repos`, {
					headers: {
						Accept: 'application/vnd.github.v3+json',
						Authorization: `token ${this.AccessToken}`
					}
				})
					.then((res) => (res.ok ? res : Promise.reject(res)))
					.then((res) => res.json());
			} else {
				return fetch(`https://api.github.com/orgs/${org}/repos`, {
					headers: {
						Accept: 'application/vnd.github.v3+json',
						Authorization: `token ${this.AccessToken}`
					}
				})
					.then((res) => (res.ok ? res : Promise.reject(res)))
					.then((res) => res.json());
			}
		});
	}
	getUser(): Promise<string> {
		return fetch('https://api.github.com/user', {
			headers: {
				Authorization: `token ${this.AccessToken}`
			}
		})
			.then((res) => (res.ok ? res : Promise.reject(res)))
			.then((res) => res.json());
	}

	public GetRepos(): Promise<[any]> {
		return fetch('https://api.github.com/user/repos', {
			headers: {
				Accept: 'application/vnd.github.v3+json',
				Authorization: `token ${this.AccessToken}`
			}
		})
			.then((res) => (res.ok ? res : Promise.reject(res)))
			.then((res) => res.json());
	}

	public GetOrgs(): Promise<[any]> {
		return fetch('https://api.github.com/user/orgs', {
			headers: {
				Accept: 'application/vnd.github.v3+json',
				Authorization: `token ${this.AccessToken}`
			}
		})
			.then((res) => (res.ok ? res : Promise.reject(res)))
			.then((res) => res.json());
	}
}

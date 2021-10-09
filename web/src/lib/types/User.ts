interface Profile {
	Name: string;
	Email: string;
	ProfilePic: string;
}
export interface User {
	_id: {
		$oid: string;
	};
	UserEmail: string;
	Profile: Profile;
}

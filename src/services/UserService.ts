import UserModel from "../models/user";

/**
 * 유저와 관련된 서비스를 처리하는 클래스.
 * 모든 함수는 static이므로 new로 생성하지 말 것.
 */
export default class UserService {
	/**
	 * 로그인이 유효한지 확인합니다.
	 */
	static async login(id: string, pw: string): Promise<UserModel|null> {
		return await UserModel.findOne({where: {id: id, password: pw}});
	}
	
	/**
	 * 사용자 정보를 가져옵니다.
	 */
	static async getInfo(id: string) {
		return await UserModel.findByPk(id);
	}
}
import passport from "passport";
import { UserDTO, UserModel } from "../models/user";

/**
 * 유저와 관련된 서비스를 처리하는 클래스.
 * 모든 함수는 static이므로 new로 생성하지 말 것.
 */
export default class UserService {
	/**
	 * 로그인이 유효한지 확인합니다.
	 * @returns ID, PW가 모두 일치한 UserModel, 없으면 null
	 */
	static async isValid(email: string, pw: string): Promise<UserModel|null> {
		return await UserModel.findOne({where: {email: email, password: pw}});
	}
	
	/**
	 * 사용자 정보를 가져옵니다.
	 * @returns 검색된 UserModel, 없으면 null
	 */
	static async getInfo(email: string): Promise<UserModel|null> {
		return await UserModel.findByPk(email);
	}

	/**
	 * 회원가입합니다.
	 * @returns 생성된 UserModel
	 */
	static async signup(user: UserDTO): Promise<UserModel> {
			return await UserModel.create({
				email: user.email,
				password: user.password
			});
	}
}
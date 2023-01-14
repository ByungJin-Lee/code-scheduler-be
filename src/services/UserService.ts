import { UserDTO, UserModel } from "../models/user";
import { UserMapper } from "../utils/modelMapper";

/**
 * 유저와 관련된 서비스를 처리하는 클래스.
 * 모든 함수는 static이므로 new로 생성하지 말 것.
 */
export default class UserService {
  /**
   * 사용자 데이터를 가져옵니다.
   * @returns 검색된 UserModel, 없으면 null
   */
  static async get(email: string): Promise<UserModel | null> {
    return await UserModel.findByPk(email);
  }

  /**
   * 주어진 email을 사용하는 이미지가 있는지 확인합니다.
   */
  static async exists(email: string): Promise<boolean> {
    if (!email) return false;

    return (await UserService.get(email)) ? true : false;
  }

  /**
   * 로그인이 유효한지 확인합니다.
   * @returns ID, PW가 모두 일치한 UserModel, 없으면 null
   */
  static async isValid(email: string, pw: string): Promise<UserModel | null> {
    return await UserModel.findOne({ where: { email: email, password: pw } });
  }

  /**
   * 회원가입합니다.
   * @returns 성공 여부
   */
  static async signup(user: UserDTO): Promise<boolean> {
    if (await UserService.exists(user.email)) {
      return false;
    }

    let userModel: UserModel = await UserMapper.createModel(user);

    return userModel ? true : false;
  }
}

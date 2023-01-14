import { TokenDTO, TokenModel } from "../models/token";

/**
 * 유저와 관련된 서비스를 처리하는 클래스.
 * 모든 함수는 static이므로 new로 생성하지 말 것.
 */
export default class TokenService {
  /**
   * 사용자 데이터를 가져옵니다.
   * @returns 검색된 TokenModel, 없으면 null
   */
  static async get(email: string): Promise<TokenModel | null> {
    return await TokenModel.findByPk(email);
  }

  /**
   * 주어진 email을 사용하는 이미지가 있는지 확인합니다.
   */
  static async exists(email: string): Promise<boolean> {
    if (!email) return false;

    return (await TokenService.get(email)) ? true : false;
  }

  /**
   * Token이 유효한지 확인합니다.
   * @returns ID, PW가 모두 일치한 TokenModel, 없으면 null
   */
  static async isValid(
    email: string,
    token: string
  ): Promise<TokenModel | null> {
    return await TokenModel.findOne({ where: { email: email, token: token } });
  }

  /**
   * 회원가입합니다.
   * @returns 성공 여부
   */
  static async register({ email, token }: TokenDTO): Promise<boolean> {
    console.log(email, token);

    let [ret, created] = await TokenModel.upsert({
      email: email,
      token: token,
    });

    return ret ? true : false;
  }
}

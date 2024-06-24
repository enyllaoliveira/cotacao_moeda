
import api from "../services/api";

export class useApi {
  public async getListCripto(offset: number) {
    try {
      const res = await api.get("assets/", {
        params: {
          limit: 10,
          offset,
        },
      });
      return res.data;
    } catch (err) {
      return err;
    }
  }
}

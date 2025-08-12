import supabase from "../supabaseClient";

// 글 작성
// 글 조회
async function ReadApi(typeSelect) {
  try {
    let data, error;
    if (typeSelect !== "category") {
      ({ data, error } = await supabase.from(typeSelect).select("*"));
    } else {
      ({ data, error } = await supabase
        .from(typeSelect)
        .select("*")
        .eq("userType", "user"));
    }

    if (error) {
      throw new Error("글 조회 실패");
    }
    return data;
  } catch (error) {
    throw error;
  }
}
// 글 업데이트
// 글 삭제
async function DeleteApi({ id, typeSelect }) {
  try {
    const {error} = await supabase.from(typeSelect).delete().eq("id", id)
    if(error) {
      throw new Error("삭제 오류")
    }
  } catch (error) {
    throw error
  }
}

export { ReadApi, DeleteApi };

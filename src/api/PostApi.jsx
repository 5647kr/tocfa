import supabase from "../supabaseClient";

// 글 작성
async function CreateApi({ data, typeSelect }) {
  try {
    const { data: newPost, error } = await supabase
      .from(typeSelect)
      .insert([data])
      .select();

    if(error) {
      throw new Error("글 작성 실패")
    }
    return newPost[0]
  } catch (error) {
    console.error(error)
  }
}
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
// 글 수정
// 글 삭제
async function DeleteApi({ id, typeSelect }) {
  try {
    const { error } = await supabase.from(typeSelect).delete().eq("id", id);
    if (error) {
      throw new Error("삭제 오류");
    }
  } catch (error) {
    throw error;
  }
}

export { CreateApi, ReadApi, DeleteApi };

import supabase from "../supabaseClient";

// 글 작성
export async function CreateApi({ data, typeSelected }) {
  try {
    const { data: newPost, error } = await supabase
      .from(`${typeSelected}`)
      .insert([data])
      .select();

    if (error) {
      throw new Error(error.message);
    }

    return newPost[0];
  } catch (error) {
    throw error;
  }
}

// 글 조회
export async function ReadApi(typeSelected) {
  try {
    const { data, error } = await supabase.from(typeSelected).select("*");

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    throw error;
  }
}

// 글 수정
export async function UpdateApi({ id, data, typeSelected }) {
  try {
    const { data: updatePost, error } = await supabase
      .from(typeSelected)
      .update(data)
      .eq("id", id)
      .select();

    if (error) {
      throw new Error(error.message);
    }
    // console.log(updatePost[0]);
    return updatePost[0];
  } catch (error) {
    throw error;
  }
}

// 글 삭제
export async function DeleteApi({ id, typeSelected }) {
  try {
    const { error } = await supabase.from(typeSelected).delete().eq("id", id);

    if (error) {
      throw new Error(error.message);
    }
  } catch (error) {
    throw error;
  }
}

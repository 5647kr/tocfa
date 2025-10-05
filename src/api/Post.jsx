import supabase from "../supabaseClient";

async function CreatePost({ data, tableName }) {
  try {
    const { data: newPost, error } = await supabase
      .from(tableName)
      .insert([data])
      .select();

    if (error) throw new Error("글 작성에 실패하였습니다.");

    return newPost[0];
  } catch (error) {
    throw { error };
  }
}

async function ReadPost(tableName) {
  try {
    const { data, error } = await supabase.from(tableName).select("*");

    if (error) throw new Error("글 조회에 실패하였습니다.");

    return data;
  } catch (error) {
    throw { error };
  }
}

async function UpdatePost({ id, data, tableName }) {
  try {
    const { data: updateData, error } = await supabase
      .from(tableName)
      .update(data)
      .eq("id", id)
      .select();

    if (error) throw new Error("글 수정에 실패하였습니다.");
    return updateData;
  } catch (error) {
    throw { error };
  }
}

async function DeletePost({ id, tableName }) {
  try {
    const { error } = await supabase.from(tableName).delete().eq("id", id);

    if (error) throw new Error("글 삭제에 실패하였습니다.");
  } catch (error) {
    throw { error };
  }
}

export { CreatePost, ReadPost, UpdatePost, DeletePost };

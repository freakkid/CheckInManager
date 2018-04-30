import { sendPage } from "../utils";
import { validator } from "../services";

async function test(ctx) {
  
  // TODO
  const course_id = ctx.params.course_id;
  if (validator.is_courseID(course_id))
  // 
  sendPage(ctx, 200, '');
}
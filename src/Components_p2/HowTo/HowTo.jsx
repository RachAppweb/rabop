import React from 'react'
import {
    MDBCol,
    MDBContainer,
    MDBIcon,
    MDBRow,
    MDBTypography,
  } from "mdb-react-ui-kit";
  import './HowTo.scss'
export default function HowTo() {
  return (
    <MDBContainer>
    <section>
      <MDBTypography
        tag="h3"
        className="text-center mb-4 pb-2  fw-bold"
        id='blue' >
        كيفية الإستعمال
      </MDBTypography>
      <p className="text-center mb-5">
        هنا يمكنك معرفة كيفية  إستخدام  هذا الموقع 
      </p>

      <MDBRow>
        <MDBCol md="6" lg="4" className="mb-4">
          <MDBTypography tag="h6" className="mb-3 text-primary">
            1 كيفية الإستخدام ؟
          </MDBTypography>
          <p>
           لمعرفة كيفية الإستخدام يمكن للمستخدم مشاهدة الفيديو في الصفحة الرئيسية أو الدخو إلى هذه الصفحة لمعلومات أكثر
          </p>
        </MDBCol>
        <MDBCol md="6" lg="4" className="mb-4">
          <MDBTypography tag="h6" className="mb-3 text-primary">
            2 كيف يمكن للمستخدم العادي إنشاء حساب ؟
          </MDBTypography>
          <p>
            
            فقط بالنقر على إنشاء حساب أعلاه وإملاء إستمارة إنشاء الحساب مع إختيار القرية بعنايةوبعد ذالك يجب على المستخدم إنتضار التأكيد من المسؤول
          </p>
        </MDBCol>
        <MDBCol md="6" lg="4" className="mb-4">
          <MDBTypography tag="h6" className="mb-3 text-primary">
            3 كي يمكن للمسؤول إنشاء حساب ؟
          </MDBTypography>
          <p>
            يجب على الراغب في تولي أمر قرية ما بالنقر على زر إنشاء حساب أعلاه ثم النقر على إنشاء حساب كمسؤول يسارا وملئ المعلومات الخاصة به مع إنتضار التأكيد منا
          </p>
        </MDBCol>
        <MDBCol md="6" lg="4" className="mb-4">
          <MDBTypography tag="h6" className="mb-3 text-primary">
            4 من سيأكد المسئول عن القرية بعد إنشائه لحسابه ؟
          </MDBTypography>
          <p>
           تأكيد المسؤول يقع على عاتقنا كما هو على عاتق المسئول على قرية فهو يقوم بالتحقق مما إذا كان العضو المنتمي إليه هو فعلا أم شخص غير مرحب به فنحن أيضا نتحقق من المسؤول لكي لا يكون هناك خطأ ما
          </p>
        </MDBCol>
        <MDBCol md="6" lg="4" className="mb-4">
          <MDBTypography tag="h6" className="mb-3 text-primary">
            5 ما الذي قد يمنع المستخدم من تسجيل الدخول ؟
          </MDBTypography>
          <p>
        
            بعد إنشاء الحساب يجب أن تتوفر بعض الشروط لكي يتمكن المستخدم من تسجيل الدخول فمثلا المستخدم العادي يجب أن يتم تأكيده من طرف المسؤول أما المستخدم من نوع مسؤول فيجب أولا أن يتم تأكيده من طرفنا ثم بعد ذالك ينشأ قرية ليتم تسجيل الدخول بنجاح
          </p>
        </MDBCol>
        <MDBCol md="6" lg="4" className="mb-4">
          <MDBTypography tag="h6" className="mb-3 text-primary">
            6 هل يمكن تعديل معلوماتي كيف ما كان نوع حسابي ؟
          </MDBTypography>
          <p>
           نعم بعد إنشاء حسابك يمكنك تغيير معلوماتك كيف ما تشاء
          </p>
        </MDBCol>
      </MDBRow>
    </section>
  </MDBContainer>
  )
}

import './resetPasswordFail.styles.scss'

const ResetPasswordFail = () => {


    return (
        <div className='body'>
            <div className="forgot-clearfix">
            <h2 className="formheader">Xác nhận liên kết</h2>
            <div className='text'>
                <p style={{fontWeight : "bold"}} >
                    Bạn không thể xác nhận được liên kết do:</p>
                <ul className="commonlist"> 
                    <li>
                        <em>Link xác nhận không đúng</em></li>
                    <li>
                        <em>Hoặc link đã hết hạn</em></li><li>
                        <em>Hoặc link đã được xác nhận rồi</em></li>
                </ul>
            </div><p><span> Bạn hãy kiểm tra lại đường link mà chúng tôi đã cung cấp trong email hoặc liên lạc với quản trị viên để gửi yêu cầu hỗ trợ. </span> </p><p> 
                <span>
                    <a href="/" className="reg_loginbtn">Đăng nhập </a>
                </span>
            </p>
            </div>
        </div>
    )
};

export default ResetPasswordFail;
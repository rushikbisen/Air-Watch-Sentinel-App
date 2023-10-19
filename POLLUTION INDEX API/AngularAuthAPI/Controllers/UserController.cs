using AngularAuthAPI.Context;
using AngularAuthAPI.Helper;
using AngularAuthAPI.Models;
using AngularAuthAPI.UtilityService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Text.RegularExpressions;

namespace AngularAuthAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly AppDbContext _authContext;
        private readonly IConfiguration _configuation;
        private readonly IEmailService _emailService;
        public UserController(AppDbContext appDbContext, IConfiguration configuration, IEmailService emailService)
        {
            _authContext = appDbContext;
            _configuation = configuration;
            _emailService = emailService;
        }
        [HttpPost("authenticate")]
        public async Task<IActionResult> Authenticate([FromBody] User userObj)
        {
            if (userObj == null) { return BadRequest(); }
            var user = await _authContext.Users.FirstOrDefaultAsync(x => x.UserName == userObj.UserName);
            if (user == null) { return NotFound(new { Message = "User Not Found" }); }
            if (!PasswordHasher.VerifyPassword(userObj.Password, user.Password))
            { return BadRequest(new { Message = "Password is incorrect" }); }
            user.Token = CreateJWTToken(user);
            return Ok(new
            {
                username = user.UserName,
                Token = user.Token,
                Message = "Login Success"
            });
        }

        [HttpPost("register")]
        public async Task<IActionResult> RegisterUser([FromBody] User userObj)
        {
            if (userObj == null) { return BadRequest(); }

            //Check Username
            if (await CheckUserNameExistAsync(userObj.UserName))
            {
                return BadRequest(new { Message = "User Name already exist" });
            }
            //Check Email
            if (await CheckEmailExistAsync(userObj.Email))
            {
                return BadRequest(new { Message = "Email Id already exist" });
            }
            //Check Password Strength
            var pass = CheckPasswordStrength(userObj.Password);
            if (string.IsNullOrEmpty(userObj.Password))
            {
                return BadRequest(new { Message = pass.ToString() });
            }

            userObj.Password = PasswordHasher.HashPassword(userObj.Password);

            userObj.Token = CreateJWTToken(userObj);
            await _authContext.Users.AddAsync(userObj);
            await _authContext.SaveChangesAsync();
            return Ok(new { Message = "User Registered" });
        }
        private async Task<bool> CheckUserNameExistAsync(string username)
        {
            return await _authContext.Users.AnyAsync(x => x.UserName == username);
        }
        private async Task<bool> CheckEmailExistAsync(string email)
        {
            return await _authContext.Users.AnyAsync(x => x.Email == email);
        }
        private string CheckPasswordStrength(string password)
        {
            StringBuilder sb = new StringBuilder();
            if (password.Length < 8)
                sb.Append("Minimum password length should be 8" + Environment.NewLine);
            if (!(Regex.IsMatch(password, "[a-z]") && Regex.IsMatch(password, "[A-Z]") && Regex
                .IsMatch(password, "[0-9]")))
                sb.Append("Password should be Alphanumeric" + Environment.NewLine);
            if (!Regex.IsMatch(password, "[<,>,@,!,#,$,%,^,&,*,(,),_,+,\\[,\\],{,},?,:,;,|,',\\,.,/,~,`,-,=]"))
                sb.Append("Password should contain special characters" + Environment.NewLine);
            return sb.ToString();
        }

        private string CreateJWTToken(User user)
        {
            var jwtTokenHandler = new JwtSecurityTokenHandler();
            //string hs256Key = KeyGenerator.GenerateHs256Key(16);
            var key = Encoding.ASCII.GetBytes("veryverysecret.....veryverysecret.....");
            var identity = new ClaimsIdentity(new Claim[]
            {
                new Claim(ClaimTypes.NameIdentifier,user.UserName),
                new Claim(ClaimTypes.Name,$"{user.FirstName} {user.LastName}"),
            });
            var credentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = identity,
                Expires = DateTime.Now.AddDays(1000),
                SigningCredentials = credentials
            };
            var token = jwtTokenHandler.CreateToken(tokenDescriptor);
            return jwtTokenHandler.WriteToken(token);
        }

        //[Authorize]
        
        [HttpGet]
        public async Task<ActionResult<User>> GetAllUsers()
        {
            return Ok(await _authContext.Users.ToListAsync());
        }
        //[HttpPost("send-reset-email/{email}")]
        //public async Task<IActionResult> SendEmail(string email)
        //{
        //    var user = await _authContext.Users.FirstOrDefaultAsync(a => a.Email == email);
        //    if (user is null)
        //    {
        //        return NotFound(new
        //        {
        //            StatusCode = 404,
        //            Message = "Email doesn't exist"
        //        });
        //    }
        //    var tokenBytes = RandomNumberGenerator.GetBytes(64);
        //    var emailToken = Convert.ToBase64String(tokenBytes);
        //    user.ResetPasswordToken = emailToken;
        //    user.ResetPasswordExpiry = DateTime.Now.AddMinutes(15);
        //    string from = _configuation["EmailSettings:From"];
        //    var emailModel = new EmailModel(email, "Reset Password", EmailBody.EmailStringBody(email, emailToken));
        //    _emailService.SendEmail(emailModel);
        //    _authContext.Entry(user).State = EntityState.Modified;
        //    await _authContext.SaveChangesAsync();
        //    return Ok(new
        //    {
        //        StatusCode = 200,
        //        Message = "Email Sent"
        //    });
        //}
        //[HttpPost("reset-password")]
        //public async Task<IActionResult> ResetPassword(ResetPasswordDto resetPasswordDto)
        //{
        //    var newToken = resetPasswordDto.EmailToken.Replace(" ", "+");
        //    var user = await _authContext.Users.AsNoTracking().FirstOrDefaultAsync(a => a.Email == resetPasswordDto.Email);
        //    if (user is null)
        //    {
        //        return NotFound(new
        //        {
        //            StatusCode = 404,
        //            Message = "User doesn't exist"
        //        });
        //    }
        //    var tokenCode = user.ResetPasswordToken;
        //    DateTime emailTokenExpiry = user.ResetPasswordExpiry;
        //    if (tokenCode != resetPasswordDto.EmailToken || emailTokenExpiry < DateTime.Now)
        //    {
        //        return BadRequest(new
        //        {
        //            StatusCode = 400,
        //            Message = "Token Expired"
        //        });
        //    }
        //    user.Password = PasswordHasher.HashPassword(resetPasswordDto.NewPassword);
        //    _authContext.Entry(user).State = EntityState.Modified;
        //    await _authContext.SaveChangesAsync();
        //    return Ok(new
        //    {
        //        StatusCode = 200,
        //        Message = "Password Reset Successfully"
        //    });
        //}
        [HttpGet("{username}")]
        public async Task<ActionResult<User>> GetUser(string username)
        {
            var watchlistItems = await _authContext.Users.FirstOrDefaultAsync(x => x.UserName == username);
            if (watchlistItems == null)
            {
                return NotFound();
            }
            return watchlistItems;
        }
        [HttpPut]
        public async Task<ActionResult<User>> update(User profile)
        {
            var user = await _authContext.Users.FirstOrDefaultAsync(x => x.id == profile.id);
            if (user is null)
            {
                return NotFound();
            }
            user.FirstName = profile.FirstName;
            user.LastName = profile.LastName;

            await _authContext.SaveChangesAsync();

            return Ok("Successfully updated");
        }
    }
}

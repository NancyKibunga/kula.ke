import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams , Link} from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import classes from './loginPage.module.css';
import Title from '../../components/Title/Title';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';


export default function LoginPage() {
  const {
    // calls the submit function when ther is no validation error
    handleSubmit,
// sending events and references for handling validation
    register,
    formState: { errors },
  } = useForm();

//   navigation function
  const navigate = useNavigate();
  const { user, login } = useAuth();
  const [params] = useSearchParams();
  const returnUrl = params.get('returnUrl');

//   checks whether the user has value and navigates accordingly
  useEffect(() => {
    if (!user) return;

    returnUrl ? navigate(returnUrl) : navigate('/');
  }, [user]);

  const submit = async ({ email, password }) => {
    await login(email, password);
  };

//components 
  return (
    <div className={classes.container}>
      <div className={classes.details}>
        <Title title="Login" />
        <form onSubmit={handleSubmit(submit)} noValidate>
          <Input
            type="email"
            label="Email"
            {...register('email', {
              required: true,
            //   if email entered does not match the below pattern, an invalid error is returned
              pattern: {
                value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,63}$/i,
                message: 'Email Is Not Valid',
              },
            })}
            error={errors.email}
          />

          <Input
            type="password"
            label="Password"
            {...register('password', {
                // must be provided and must match the initial password
              required: true,
            })}
            error={errors.password}
          />

          <Button type="submit" text="Login" />
 
 {/* New user link to register */}
 
 <div className={classes.register}>
            Are you a New User? &nbsp;
            <Link to={`/register${returnUrl ? '?returnUrl=' + returnUrl : ''}`}>
             Click Here to Register.
            </Link>
          </div>

        </form>
      </div>
    </div>
  );
}
const GeneralError = require('./GeneralError');
const GetDataError = require('./GetDataError');
const NotSamePassword = require('./NotSamePassword');
const UpdateUserError = require('./UpdateUserError');
const CreateUserError = require('./CreateUserError');
const RemoveUserError = require('./RemoveUserError');
const CreateDataError = require('./CreateDataError');
const LoginFailedError = require('./LoginFailedError');
const UserNotFoundError = require('./UserNotFoundError');
const SessionFailedError = require('./SessionFailedError');
const RemoveBaseDataError = require('./RemoveBaseDataError');
const CreateBaseDateError = require('./CreateBaseDateError');
const UpdateBaseDataError = require('./UpdateBaseDataError');
const SmsCodeNotValidError = require('./SmsCodeNotValidError');
const SmsCodeNotExpireError = require('./SmsCodeNotExpireError');
const CurrectInputDataError = require('./CurrectInputDataError');
const BaseDataNotFoundError = require('./BaseDataNotFoundError');
const PasswordNotValidError = require('./PasswordNotValidError');
const UserAlreadyExistError = require('./UserAlreadyExistError');
const UserExtraDataFindError = require('./UserExtraDataFindError');
const UserOrganNotFoundError = require('./UserOrganNotFoundError');
const PublicKeyNotValidError = require('./PublicKeyNotValidError');
const DatabaseConnectionError = require('./DatabaseConnectionError');
const BaseDataAlreadyExistError = require('./BaseDataAlreadyExistError');
const OrganAlreadyExistCodeError = require('./OrganAlreadyExistCodeError');

module.exports = {
    GeneralError,
    GetDataError,
    NotSamePassword,
    RemoveUserError,
    UpdateUserError,
    CreateUserError,
    CreateDataError,
    LoginFailedError,
    UserNotFoundError,
    SessionFailedError,
    CreateBaseDateError,
    UpdateBaseDataError,
    RemoveBaseDataError,
    SmsCodeNotValidError,
    BaseDataNotFoundError,
    CurrectInputDataError,
    PasswordNotValidError,
    UserAlreadyExistError,
    PublicKeyNotValidError,
    UserOrganNotFoundError,
    UserExtraDataFindError,
    DatabaseConnectionError,
    BaseDataAlreadyExistError,
    OrganAlreadyExistCodeError,
    SmsCodeNotExpireError,
}
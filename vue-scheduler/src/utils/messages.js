import localizeFilter from '@/filters/localize.filter'

export default {
    'logout': localizeFilter('Message_logout'),
    'login': localizeFilter('Message_pleaseSignIn'),
    'auth/user-not-found': localizeFilter('Message_userWithEmailNotExists'),
    'auth/wrong-password' : localizeFilter('Message_incorrectPassword'),
    'auth/email-already-in-use' : localizeFilter('Message_userYetExists'),
}
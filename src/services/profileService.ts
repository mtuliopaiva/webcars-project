import { getAuth, updateProfile, User } from 'firebase/auth';

class ProfileService {
  private auth = getAuth();

  async updateProfile(displayName: string, photoURL: string): Promise<void> {
    try {
        console.log('displayName:', displayName);
    console.log('photoURL:', photoURL);

      const currentUser: User | null = this.auth.currentUser;
  
      if (currentUser) {
        await updateProfile(currentUser, { displayName, photoURL });
        console.log('Perfil atualizado com sucesso.');
      } else {
        throw new Error('Usuário não autenticado.');
      }
    } catch (error) {
      console.error('Erro ao atualizar o perfil:', error);
      throw new Error('Falha ao atualizar o perfil.');
    }
  }
}

const profileService = new ProfileService();
export default profileService;

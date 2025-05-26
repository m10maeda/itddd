import {
  AddMemberUseCaseInputData,
  ChangeOwnerUseCaseInputData,
  DeleteCircleUseCaseInputData,
  RemoveMemberUseCaseInputData,
  FindAllCirclesUseCaseInputData,
  GetCandidatesUseCaseInputData,
  RegisterCircleUseCaseInputData,
  RenameCircleUseCaseInputData,
  type IAddMemberUseCaseInputPort,
  type IChangeOwnerUseCaseInputPort,
  type IDeleteCircleUseCaseInputPort,
  type IRemoveMemberUseCaseInputPort,
  type IFindAllCirclesUseCaseInputPort,
  type IGetCandidatesUseCaseInputPort,
  type IGetCircleUseCaseInputPort,
  type IRegisterCircleUseCaseInputPort,
  type IRenameCircleUseCaseInputPort,
  type MemberData,
  type CircleData,
} from '../application/use-case/input-ports';
import {
  IMemberDeletedHandler,
  Member,
  MemberId,
} from '../domain/models/member';

export class CircleService {
  private readonly addMemberUseCase: IAddMemberUseCaseInputPort;

  private readonly changeOwnerUseCase: IChangeOwnerUseCaseInputPort;

  private readonly deleteUseCase: IDeleteCircleUseCaseInputPort;

  private readonly findAllUseCase: IFindAllCirclesUseCaseInputPort;

  private readonly getCandidatesUseCase: IGetCandidatesUseCaseInputPort;

  private readonly getUseCase: IGetCircleUseCaseInputPort;

  private readonly memberEventHandler: IMemberDeletedHandler;

  private readonly registerUseCase: IRegisterCircleUseCaseInputPort;

  private readonly removeMemberUseCase: IRemoveMemberUseCaseInputPort;

  private readonly renameUseCase: IRenameCircleUseCaseInputPort;

  public async addMember(circleId: string, memberId: string): Promise<void> {
    await this.addMemberUseCase.handle(
      new AddMemberUseCaseInputData(circleId, memberId),
    );
  }

  public async changeOwner(circleId: string, ownerId: string): Promise<void> {
    await this.changeOwnerUseCase.handle(
      new ChangeOwnerUseCaseInputData(circleId, ownerId),
    );
  }

  public async delete(circleId: string): Promise<void> {
    await this.deleteUseCase.handle(new DeleteCircleUseCaseInputData(circleId));
  }

  public async findAllBy(page = 1, size = 20): Promise<Iterable<CircleData>> {
    const { circles } = await this.findAllUseCase.handle(
      new FindAllCirclesUseCaseInputData(page, size),
    );

    return circles;
  }

  public async getBy(circleId: string): Promise<CircleData> {
    const { circle } = await this.getUseCase.handle(
      new GetCandidatesUseCaseInputData(circleId),
    );

    return circle;
  }

  public async getCandidates(circleId: string): Promise<Iterable<MemberData>> {
    const { candidates } = await this.getCandidatesUseCase.handle(
      new GetCandidatesUseCaseInputData(circleId),
    );

    return candidates;
  }

  public async onDeletedMember(memberId: string): Promise<void> {
    await this.memberEventHandler.onMemberDeleted(
      new Member(new MemberId(memberId)),
    );
  }

  public async register(name: string, ownerId: string): Promise<string> {
    const { registeredId } = await this.registerUseCase.handle(
      new RegisterCircleUseCaseInputData(name, ownerId),
    );

    return registeredId;
  }

  public async removeMember(circleId: string, memberId: string): Promise<void> {
    await this.removeMemberUseCase.handle(
      new RemoveMemberUseCaseInputData(circleId, memberId),
    );
  }

  public async rename(circleId: string, name: string): Promise<void> {
    await this.renameUseCase.handle(
      new RenameCircleUseCaseInputData(circleId, name),
    );
  }

  public constructor(
    registerUseCase: IRegisterCircleUseCaseInputPort,
    getUseCase: IGetCircleUseCaseInputPort,
    findAllUseCase: IFindAllCirclesUseCaseInputPort,
    renameUseCase: IRenameCircleUseCaseInputPort,
    deleteUseCase: IDeleteCircleUseCaseInputPort,
    getCandidatesUseCase: IGetCandidatesUseCaseInputPort,
    addMemberUseCase: IAddMemberUseCaseInputPort,
    removeMemberUseCase: IRemoveMemberUseCaseInputPort,
    changeOwnerUseCase: IChangeOwnerUseCaseInputPort,
    memberEventHandler: IMemberDeletedHandler,
  ) {
    this.registerUseCase = registerUseCase;
    this.getUseCase = getUseCase;
    this.findAllUseCase = findAllUseCase;
    this.renameUseCase = renameUseCase;
    this.deleteUseCase = deleteUseCase;
    this.getCandidatesUseCase = getCandidatesUseCase;
    this.addMemberUseCase = addMemberUseCase;
    this.removeMemberUseCase = removeMemberUseCase;
    this.changeOwnerUseCase = changeOwnerUseCase;
    this.memberEventHandler = memberEventHandler;
  }
}

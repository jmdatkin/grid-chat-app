import { ModelInit, MutableModel } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncCollection, AsyncItem } from "@aws-amplify/datastore";









type EagerRoom = {
  readonly id: string;
  readonly name?: string | null;
  readonly users?: (UserRoom | null)[] | null;
}

type LazyRoom = {
  readonly id: string;
  readonly name?: string | null;
  readonly users: AsyncCollection<UserRoom>;
}

export declare type Room = LazyLoading extends LazyLoadingDisabled ? EagerRoom : LazyRoom

export declare const Room: (new (init: ModelInit<Room>) => Room) & {
  copyOf(source: Room, mutator: (draft: MutableModel<Room>) => MutableModel<Room> | void): Room;
}

type EagerUserRoom = {
  readonly id: string;
  readonly user: User;
  readonly room: Room;
}

type LazyUserRoom = {
  readonly id: string;
  readonly user: AsyncItem<User>;
  readonly room: AsyncItem<Room>;
}

export declare type UserRoom = LazyLoading extends LazyLoadingDisabled ? EagerUserRoom : LazyUserRoom

export declare const UserRoom: (new (init: ModelInit<UserRoom>) => UserRoom) & {
  copyOf(source: UserRoom, mutator: (draft: MutableModel<UserRoom>) => MutableModel<UserRoom> | void): UserRoom;
}

type EagerUser = {
  readonly id: string;
  readonly UserRooms?: (UserRoom | null)[] | null;
}

type LazyUser = {
  readonly id: string;
  readonly UserRooms: AsyncCollection<UserRoom>;
}

export declare type User = LazyLoading extends LazyLoadingDisabled ? EagerUser : LazyUser

export declare const User: (new (init: ModelInit<User>) => User) & {
  copyOf(source: User, mutator: (draft: MutableModel<User>) => MutableModel<User> | void): User;
}

type EagerMessage = {
  readonly id: string;
  readonly user_id?: string | null;
  readonly room_id?: number | null;
  readonly position_x?: number | null;
  readonly position_y?: number | null;
  readonly body?: string | null;
}

type LazyMessage = {
  readonly id: string;
  readonly user_id?: string | null;
  readonly room_id?: number | null;
  readonly position_x?: number | null;
  readonly position_y?: number | null;
  readonly body?: string | null;
}

export declare type Message = LazyLoading extends LazyLoadingDisabled ? EagerMessage : LazyMessage

export declare const Message: (new (init: ModelInit<Message>) => Message) & {
  copyOf(source: Message, mutator: (draft: MutableModel<Message>) => MutableModel<Message> | void): Message;
}
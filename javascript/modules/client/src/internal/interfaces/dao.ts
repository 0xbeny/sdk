import { IClientCore } from "./client-core";

export interface IClientDaoBase extends IClientCore {
  dao: {
    create(
      daoConfig: DaoConfig,
      tokenConfig: TokenConfig,
      mintConfig: MintConfig,
      votingConfig: VotingConfig,
      gsnForwarder?: string,
    ): Promise<string>;
    /** Checks whether a role is granted by the curren DAO's ACL settings */
    hasPermission: (
      where: string,
      who: string,
      role: DaoRole,
      data: Uint8Array,
    ) => Promise<void>;
  };
}

export interface IClientDaoWhitelist extends IClientCore {
  dao: {
    whitelist: {
      createProposal: (
        startDate: number,
        endDate: number,
        executeApproved?: boolean,
        voteOnCreation?: boolean,
      ) => Promise<string>;
      voteProposal: (proposalId: string, approve: boolean) => Promise<void>;
      executeProposal: (proposalId: string) => Promise<void>;
      setDaoConfig: (address: string, config: DaoConfig) => Promise<void>;
      setVotingConfig: (address: string, config: VotingConfig) => Promise<void>;
    };
  };
}

export interface IClientDaoSimpleVote extends IClientCore {
  dao: {
    simpleVote: {
      createProposal: (
        startDate: number,
        endDate: number,
        executeApproved?: boolean,
        voteOnCreation?: boolean,
      ) => Promise<string>;
      voteProposal: (proposalId: string, approve: boolean) => Promise<void>;
      executeProposal: (proposalId: string) => Promise<void>;
      setDaoConfig: (address: string, config: DaoConfig) => Promise<void>;
      setVotingConfig: (address: string, config: VotingConfig) => Promise<void>;
    };
  };
}

// DAO DATA TYPES
export interface DaoAction {
  to: string;
  value: bigint;
  bytes: string;
}

export enum DaoRole {
  UPGRADE_ROLE = "UPGRADE_ROLE",
  DAO_CONFIG_ROLE = "DAO_CONFIG_ROLE",
  EXEC_ROLE = "EXEC_ROLE",
  WITHDRAW_ROLE = "WITHDRAW_ROLE",
  SET_SIGNATURE_VALIDATOR_ROLE = "SET_SIGNATURE_VALIDATOR_ROLE",
}

export interface DaoConfig {
  name: string;
  metadata: string;
}

export interface TokenConfig {
  addr: string;
  name: string;
  symbol: string;
}

export interface MintConfig {
  receivers: string[];
  amounts: bigint[];
}

/** Global settings applied to the organization */
export interface VotingConfig {
  /** 0-100 as a percentage */
  minSupport: number;
  /** 0-100 as a percentage */
  minParticipation: number;
  /** In seconds */
  minDuration: number;
}

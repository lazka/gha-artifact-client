class ArtifactClientError(Exception):
    """Base exception for artifact client failures."""


class UnsupportedEnvironmentError(ArtifactClientError):
    """Raised when the current process is not running in a supported Actions runtime."""


class NodeNotFoundError(ArtifactClientError):
    """Raised when the configured Node.js executable cannot be started."""


class NodeWrapperExecutionError(ArtifactClientError):
    """Raised when the Node.js node wrapper fails."""

    def __init__(
        self,
        message: str,
        *,
        returncode: int,
        stderr: str,
        stdout: str,
    ) -> None:
        super().__init__(message)
        self.returncode = returncode
        self.stderr = stderr
        self.stdout = stdout
